import os
import sys
import requests
from zipfile import ZipFile
from io import BytesIO
import shutil
from info import version


class UpdateManager:
    def __init__(self) -> None:
        self.version = version
        self.repo_url = "https://github.com/brynchess/pi-resistive-keyboard"
        self.release_tag = "v0.0.1c"

    def download_and_extract_zip(self, repo_url, release_tag, target_directory):
        # Create a temporary directory to store the downloaded zip file
        temp_dir = os.path.join(target_directory, 'temp_update')
        os.makedirs(temp_dir, exist_ok=True)

        # Construct the URL for the release zip file
        zip_url = f"{repo_url}/releases/download/{release_tag}/pi-resistive-keyboard.zip"

        # Download the zip file
        response = requests.get(zip_url)
        
        if response.status_code == 200:
            # Extract the zip file
            with ZipFile(BytesIO(response.content)) as zip_ref:
                zip_ref.extractall(temp_dir)

            # Get the name of the extracted directory
            extracted_dir = os.path.join(temp_dir, os.listdir(temp_dir)[0])

            # Copy the contents to the target directory, overwriting existing files
            for item in os.listdir(extracted_dir):
                s = os.path.join(extracted_dir, item)
                d = os.path.join(target_directory, item)
                if os.path.isdir(s):
                    shutil.copytree(s, d, symlinks=True, dirs_exist_ok=True)
                else:
                    shutil.copy2(s, d)

            print(f"Update successful. Clean up temporary files.")
            
            # Clean up temporary files
            shutil.rmtree(temp_dir)
            return {"Status": "Success"}
        else:
            print(f"Failed to download update. HTTP Status Code: {response.status_code}")
            raise requests.exceptions.HTTPError
        
    def is_update_available(self):
        return self.release_tag != version

    def update(self):
        target_directory = os.path.expanduser(".")
        return self.download_and_extract_zip(self.repo_url, self.release_tag, target_directory)
    
    def restart(self):
        os.execl(sys.executable, os.path.abspath(__file__), *sys.argv)