#!/bin/bash

set -e

# Usage function
usage() {
    echo "Matter Hex File Regeneration Script"
    echo ""
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -h, --help              Show this help message"
    echo "  -s, --sample SAMPLE     Build only specific sample (can be used multiple times)"
    echo "                          Options: lock, light_bulb, contact_sensor, temperature_sensor, weather_station"
    echo "  -b, --board BOARD       Build only for specific board (can be used multiple times)"
    echo "                          Options: nrf52840dk, nrf5340dk, nrf54l15dk, nrf54lm20dk, thingy53"
    echo "  -d, --dry-run           Show what would be built without building"
    echo "  -v, --verbose           Show build output in real-time"
    echo ""
    echo "Examples:"
    echo "  $0                                    # Build all samples for all boards"
    echo "  $0 -s lock -s light_bulb              # Build only lock and light_bulb samples"
    echo "  $0 -b nrf52840dk                      # Build all samples for nrf52840dk only"
    echo "  $0 -s lock -b nrf5340dk               # Build lock sample for nrf5340dk only"
    echo "  $0 -d                                 # Dry run to see what would be built"
    echo ""
    echo "Using with npm run:"
    echo "  If this script is called via npm run, use '--' to pass arguments:"
    echo "  npm run regenerate -- -s lock                       # Build lock sample only"
    echo "  npm run regenerate -- -d -b nrf52840dk              # Dry run for nrf52840dk"
    echo "  npm run regenerate -- -s lock -s light_bulb         # Build multiple samples"
    echo "  npm run regenerate -- -h                            # Show this help message"
    echo ""
    exit 0
}

# Parse command line arguments
SPECIFIC_SAMPLES=()
SPECIFIC_BOARDS=()
DRY_RUN=0
VERBOSE=0

while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            usage
            ;;
        -s|--sample)
            SPECIFIC_SAMPLES+=("$2")
            shift 2
            ;;
        -b|--board)
            SPECIFIC_BOARDS+=("$2")
            shift 2
            ;;
        -d|--dry-run)
            DRY_RUN=1
            shift
            ;;
        -v|--verbose)
            VERBOSE=1
            shift
            ;;
        *)
            echo "Unknown option: $1"
            usage
            ;;
    esac
done

# Check if ZEPHYR_BASE is set
if [ -z "$ZEPHYR_BASE" ]; then
    echo "Error: ZEPHYR_BASE environment variable is not set"
    echo "Please source your nRF Connect SDK environment first"
    echo ""
    echo "Example:"
    echo "  source ~/ncs/zephyr/zephyr-env.sh"
    exit 1
fi

# Paths
NRF_BASE="$ZEPHYR_BASE/../nrf"
SAMPLES_BASE="$NRF_BASE/samples/matter"
APPS_BASE="$NRF_BASE/applications"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RESOURCES_BASE="$SCRIPT_DIR/../resources/devices"
FIRMWARE_DIR="$RESOURCES_BASE/firmware"
FACTORY_DATA_DIR="$RESOURCES_BASE/factory_data"

# Verify paths exist
if [ ! -d "$NRF_BASE" ]; then
    echo "Error: nRF directory not found at $NRF_BASE"
    exit 1
fi

echo "================================"
echo "Matter Hex File Regeneration"
echo "================================"
echo ""
echo "NRF Base: $NRF_BASE"
echo "Resources: $RESOURCES_BASE"
echo ""

# Define sample configurations
# Format: "sample_name:sample_path_relative_to_nrf:is_application"
declare -a SAMPLES=(
    "lock:samples/matter/lock:0"
    "light_bulb:samples/matter/light_bulb:0"
    "contact_sensor:samples/matter/contact_sensor:0"
    "temperature_sensor:samples/matter/temperature_sensor:0"
    "weather_station:applications/matter_weather_station:1"
)

# Define board configurations
# Format: "board_identifier:board_name:firmware_dir:has_cpunet:build_extra_args"
declare -a BOARDS=(
    "nrf52840dk:nrf52840dk/nrf52840:nrf52840:0:"
    "nrf5340dk:nrf5340dk/nrf5340/cpuapp:nrf5340:1:"
    "nrf54l15dk:nrf54l15dk/nrf54l15/cpuapp:nrf54l15:0:"
    "nrf54lm20dk:nrf54lm20dk/nrf54lm20a/cpuapp:nrf54lm20:0:"
)

# Special board configurations (for weather_station only)
declare -a WEATHER_STATION_BOARDS=(
    "thingy53:thingy53/nrf5340/cpuapp:thingy53:0:"
)

# Helper function to check if a sample should be built
should_build_sample() {
    local sample_name=$1
    
    # If no specific samples specified, build all
    if [ ${#SPECIFIC_SAMPLES[@]} -eq 0 ]; then
        return 0
    fi
    
    # Check if this sample is in the list
    for s in "${SPECIFIC_SAMPLES[@]}"; do
        if [ "$s" == "$sample_name" ]; then
            return 0
        fi
    done
    
    return 1
}

# Helper function to check if a board should be built
should_build_board() {
    local board_id=$1
    
    # If no specific boards specified, build all
    if [ ${#SPECIFIC_BOARDS[@]} -eq 0 ]; then
        return 0
    fi
    
    # Check if this board is in the list
    for b in "${SPECIFIC_BOARDS[@]}"; do
        if [ "$b" == "$board_id" ]; then
            return 0
        fi
    done
    
    return 1
}

# Calculate total builds
calculate_total_builds() {
    local total=0
    for sample_config in "${SAMPLES[@]}"; do
        IFS=':' read -r sample_name sample_path is_app <<< "$sample_config"
        
        # Skip if sample not in filter
        if ! should_build_sample "$sample_name"; then
            continue
        fi
        
        if [ "$sample_name" == "weather_station" ]; then
            for board_config in "${WEATHER_STATION_BOARDS[@]}"; do
                IFS=':' read -r board_id board_name firmware_subdir has_cpunet extra_args <<< "$board_config"
                if should_build_board "$board_id"; then
                    total=$((total + 1))
                fi
            done
        else
            for board_config in "${BOARDS[@]}"; do
                IFS=':' read -r board_id board_name firmware_subdir has_cpunet extra_args <<< "$board_config"
                if should_build_board "$board_id"; then
                    total=$((total + 1))
                fi
            done
        fi
    done
    echo "$total"
}

TOTAL_BUILDS=$(calculate_total_builds)
CURRENT_BUILD=0

# Check if there are any builds to do
if [ "$TOTAL_BUILDS" -eq 0 ]; then
    echo "No builds match the specified filters."
    echo "Samples: ${SPECIFIC_SAMPLES[*]:-all}"
    echo "Boards: ${SPECIFIC_BOARDS[*]:-all}"
    exit 0
fi

# Function to draw progress bar
draw_progress_bar() {
    local current=$1
    local total=$2
    local sample_name=$3
    local board_name=$4
    
    local percent=$((current * 100 / total))
    local completed=$((current * 50 / total))
    local remaining=$((50 - completed))
    
    printf "\rProgress: ["
    printf "%${completed}s" | tr ' ' '='
    printf "%${remaining}s" | tr ' ' '-'
    printf "] %3d%% (%d/%d)" "$percent" "$current" "$total"
    
    if [ -n "$sample_name" ] && [ -n "$board_name" ]; then
        printf " Building: %s for %s" "$sample_name" "$board_name"
    fi
    
    # Clear to end of line
    printf "\033[K"
}

# Function to build a sample for a specific board
build_sample() {
    local sample_name=$1
    local sample_path=$2
    local board_id=$3
    local board_name=$4
    local firmware_subdir=$5
    local has_cpunet=$6
    local extra_args=$7
    local first_board=$8
    
    CURRENT_BUILD=$((CURRENT_BUILD + 1))
    draw_progress_bar "$CURRENT_BUILD" "$TOTAL_BUILDS" "$sample_name" "$board_id"
    
    local sample_full_path="$NRF_BASE/$sample_path"
    local build_dir="$sample_full_path/build_temp_${board_id}_$$"
    
    # Build the sample
    cd "$sample_full_path"
    
    # Clean any previous temp build
    rm -rf "$build_dir"
    
    # Build with west
    if [ -n "$extra_args" ]; then
        west build -b "$board_name" -d "$build_dir" --sysbuild $extra_args > "$build_dir.log" 2>&1
    else
        west build -b "$board_name" -d "$build_dir" --sysbuild > "$build_dir.log" 2>&1
    fi
    
    if [ $? -ne 0 ]; then
        echo ""
        echo "Error building $sample_name for $board_name"
        echo "Check log: $build_dir.log"
        return 1
    fi
    
    # Copy firmware files
    local dest_firmware_dir="$FIRMWARE_DIR/$firmware_subdir"
    mkdir -p "$dest_firmware_dir"
    
    # Determine the output filename based on firmware subdir and sample
    # Special handling for weather_station on thingy53
    if [ "$sample_name" == "weather_station" ] && [ "$board_id" == "thingy53" ]; then
        local output_base="thingy53_matter_weather_station"
        # For thingy53 weather station, copy the zip file
        if [ -f "$build_dir/dfu_application.zip" ]; then
            cp "$build_dir/dfu_application.zip" "$dest_firmware_dir/${output_base}.zip"
            echo "Copied: dfu_application.zip -> $dest_firmware_dir/${output_base}.zip" >> "$build_dir.log"
        fi
    else
        local output_base="${board_id}_${sample_name}"
        
        # Copy application core hex
        if [ -f "$build_dir/merged.hex" ]; then
            cp "$build_dir/merged.hex" "$dest_firmware_dir/${output_base}.hex"
            echo "" >> "$build_dir.log"
        echo "Copied: merged.hex -> $dest_firmware_dir/${output_base}.hex" >> "$build_dir.log"
    else
        echo ""
        echo "Warning: merged.hex not found for $sample_name on $board_name"
    fi
        
        # Copy network core hex if applicable
        if [ "$has_cpunet" == "1" ]; then
            if [ -f "$build_dir/merged_CPUNET.hex" ]; then
                cp "$build_dir/merged_CPUNET.hex" "$dest_firmware_dir/${output_base}_CPUNET.hex"
            echo "Copied: merged_CPUNET.hex -> $dest_firmware_dir/${output_base}_CPUNET.hex" >> "$build_dir.log"
        else
            echo ""
            echo "Warning: merged_CPUNET.hex not found for $sample_name on $board_name"
        fi
        fi
    fi
    
    # Copy factory data from first board only
    if [ "$first_board" == "1" ]; then
        local factory_data_src="$build_dir/${sample_name}/zephyr/factory_data.hex"
        if [ -f "$factory_data_src" ]; then
            mkdir -p "$FACTORY_DATA_DIR"
            cp "$factory_data_src" "$FACTORY_DATA_DIR/${sample_name}.hex"
            echo "Copied: factory_data.hex -> $FACTORY_DATA_DIR/${sample_name}.hex" >> "$build_dir.log"
        else
            # Try alternate path
            factory_data_src="$build_dir/matter_${sample_name}/zephyr/factory_data.hex"
            if [ -f "$factory_data_src" ]; then
                mkdir -p "$FACTORY_DATA_DIR"
                cp "$factory_data_src" "$FACTORY_DATA_DIR/${sample_name}.hex"
                echo "Copied: factory_data.hex -> $FACTORY_DATA_DIR/${sample_name}.hex" >> "$build_dir.log"
            fi
        fi
    fi
    
    # Clean up build directory but keep log
    rm -rf "$build_dir"
    rm -f "$build_dir.log"
    
    return 0
}

# Main build loop
if [ "$DRY_RUN" -eq 1 ]; then
    echo "================================"
    echo "DRY RUN - would build:"
    echo "================================"
    echo ""
    
    build_num=0
    for sample_config in "${SAMPLES[@]}"; do
        IFS=':' read -r sample_name sample_path is_app <<< "$sample_config"
        
        # Skip if sample not in filter
        if ! should_build_sample "$sample_name"; then
            continue
        fi
        
        # Determine which board array to use
        if [ "$sample_name" == "weather_station" ]; then
            BOARD_ARRAY=("${WEATHER_STATION_BOARDS[@]}")
        else
            BOARD_ARRAY=("${BOARDS[@]}")
        fi
        
        for board_config in "${BOARD_ARRAY[@]}"; do
            IFS=':' read -r board_id board_name firmware_subdir has_cpunet extra_args <<< "$board_config"
            
            # Skip if board not in filter
            if ! should_build_board "$board_id"; then
                continue
            fi
            
            build_num=$((build_num + 1))
            echo "$build_num. Sample: $sample_name, Board: $board_id ($board_name)"
        done
    done
    
    echo ""
    echo "Total: $TOTAL_BUILDS builds"
    exit 0
fi

echo "Starting builds..."
echo ""

draw_progress_bar 0 "$TOTAL_BUILDS" "" ""

for sample_config in "${SAMPLES[@]}"; do
    IFS=':' read -r sample_name sample_path is_app <<< "$sample_config"
    
    # Skip if sample not in filter
    if ! should_build_sample "$sample_name"; then
        continue
    fi
    
    first_board=1
    
    # Determine which board array to use
    if [ "$sample_name" == "weather_station" ]; then
        BOARD_ARRAY=("${WEATHER_STATION_BOARDS[@]}")
    else
        BOARD_ARRAY=("${BOARDS[@]}")
    fi
    
    for board_config in "${BOARD_ARRAY[@]}"; do
        IFS=':' read -r board_id board_name firmware_subdir has_cpunet extra_args <<< "$board_config"
        
        # Skip if board not in filter
        if ! should_build_board "$board_id"; then
            continue
        fi
        
        if ! build_sample "$sample_name" "$sample_path" "$board_id" "$board_name" "$firmware_subdir" "$has_cpunet" "$extra_args" "$first_board"; then
            echo ""
            echo "Build failed. Stopping."
            exit 1
        fi
        
        first_board=0
    done
done

# Final progress bar
echo ""
echo ""
echo "================================"
echo "All builds completed successfully!"
echo "================================"
echo ""
echo "Firmware files updated in: $FIRMWARE_DIR"
echo "Factory data files updated in: $FACTORY_DATA_DIR"
echo ""
