# Footnote
A digital choreography notation tool.

## Git commands
Follow these steps to work with the Git repository:

1. **Set up: Clone the Repository**
  Navigate to your directory (e.g., `cse403`) and run the following command to clone the Git repository into a directory named `footnote`:

  ```bash git clone git@github.com:miahuynhh/footnote.git`

  Then, navigate to the footnote directory
  ```bash cd footnote`

2. **Avoid Merge Conflicts During Development**
  To avoid merge conflicts, always run git pull before making changes in your local repository
  ```bash git pull`

3. **Push Your Changes**
  When ready to push your changes, run these commands in the footnote directory
  *1. add files to the commit*
    *(option 1) this will add all new files, might not want to do this for node modules.*
  ```bash git add .`
    *(option 2: recommended) this allows you to add specific files*
  ```bash git add <file_names>`

  *2. stage the commit*
  ```bash git commit -m "descriptive commit message"`

  *3. push the commit*
  ```bash git push`