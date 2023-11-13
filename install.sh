#!/bin/bash

# Set the repository URL
repo_url="https://github.com/brynchess/pi-resistive-keyboard/releases/download/v0.0.1b/pi-resistive-keyboard.zip"

# Set the target directory
target_dir=~/Scripts

# Step 1: Download the latest release from the GitHub repository
echo "Downloading the latest release..."
wget -qO- $repo_url -O /tmp/latest_release.zip

# Step 2: Unzip it to the target directory
echo "Unzipping to $target_dir..."
mkdir -p "$target_dir"
unzip -q /tmp/latest_release.zip -d "$target_dir"
rm /tmp/latest_release.zip

# Step 3: Create a virtual environment inside the app folder
echo "Creating a virtual environment..."
python3 -m venv "$target_dir"/venv

# Step 4: Install dependencies from requirements.txt in the virtual environment
echo "Installing dependencies..."
"$target_dir"/venv/bin/pip install -r "$target_dir"/pi-resistive-keyboard/requirements.txt

echo "Script completed successfully."