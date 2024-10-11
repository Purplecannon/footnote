# Footnote
A digital choreography notation tool.

## Git commands
Follow these steps to work with the Git repository:

1. **Set up - Clone the Repository** <br>
  Navigate to your directory (e.g., ```cse403```) and run the following command to clone the Git repository into a directory named ```footnote```: <br>
  ```bash
  git clone git@github.com:miahuynhh/footnote.git
  ``` <br>
  Then, navigate to the footnote directory:<br>
  ```bash cd footnote``` <br>

2. **Avoid Merge Conflicts During Development** <br>
  To avoid merge conflicts, always run git pull before making changes in your local repository: <br>
  ```bash git pull``` <br>

3. **Push Your Changes** <br>
  When ready to push your changes, run these commands in the footnote directory: <br>
  *1. add files to the commit* <br>
    *(option 1) this will add all new files, might not want to do this for node modules.* <br>
  ```bash git add .``` <br>
    *(option 2: recommended) this allows you to add specific files* <br>
  ```bash git add <file_names>``` <br>
  *2. stage the commit* <br>
  ```bash git commit -m "descriptive commit message"``` <br>
  *3. push the commit* <br>
  ```bash git push``` <br>