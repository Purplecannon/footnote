# User Manual

## A high-level description

Footnote is a tool designed to help dancers and choreographers digitally notate, visualize, and
share their routines with ease. Whether you’re a beginner or a seasoned dancer, Footnote makes it
easy to organize and document choreography in a much more efficient way than traditional methods.
Footnote's key feature allows a user to leave detailed notes on specific timestamps in their dance
video.

## How to install the software

You need an internet connection and a web browser, Chrome is recommended. There are no further system prerequisites to use Footnote.

## How to run the software

For beta release: Only works locally and not on our public domain, refer to our [DeveloperGuidelines](./DeveloperGuidelines.md) for instructions to build Footnote.
For final release: Navigate to <https://footnote.us/> to use Footnote.

## How to use the software

The initial page will be a login page where you can enter your username and password if you have an account with Footnote already. If it is your first time using Footnote, you can click the 'Click Here!' to create an account. This will direct you to a page where you can create a username and a password and confirm your password. Once your account is created, you will be directed to the login page to log into your account you just made.

After successfully giving your username and password, you will be directed to the projects home page. Here, you will be able to see all the different projects you have previously made displayed in a board view. If a previously made project is clicked on, it will open the project page for that project. You will also have the button to create a new projects. If the create new project button is clicked, you will be directed to a blank project page.

The project page has three main sections.

1. The top left quadrant includes the video, with the play/pause button and scrubber to move the current time in the video.
2. The botton left quadrant will include the annotation functions. This includes a text box where you can write the annotaitons for the video and the timestamp where the video is paused. There are also four buttons above the text box. This includes a plus button for creating a new annotation at the current timestamp, a pencil button to edit the currently selected annotation, a checkmark to save the current annotation at the selected timestamp, and lastly, a trash can to delete the selected annotation.
3. The right half of the screen will include a list of all of the previously made annotations in chronological order, displaying the timestamp and text for each annotation. This list will be blank when creating a new project and will populate with annotations as annotations are created and saved with the checkmark in the bottom left section of the screen.

At the intitial page when creating a new project, the annotation list on the right side and video section on the top left of the screen will be blank. The video screen on the left will have a button to upload a video, and when clicked, will take you to a pop-up screen to upload your desired dance video to annotate dance moves.

## How to report a bug

Internally, we will be using the [Issues](https://github.com/miahuynhh/footnote/issues) tab in our github repository. This allows us to keep track of bugs being reported and address them right away. We can even tag people who have worked on that portion of the code. After the bug has been addressed, the issue will be closed. However, we will still have a history of bugs which helps us keep track of “known bugs” and allows us to better fix bugs that may arise in the future.

As for bug reporting, we will be following some of the tips mentioned in the bug writing guidelines from Mozilla

1.  First, please describe the expected behavior (how our website should work) and the actual behavior.

2.  Indicate whether you can reproduce the bug, and if so, please outline the steps you will take.

    a. Additionally, anyone who reports a bug should copy and paste the error that they are getting in the issue description. This allows people to get a bigger picture of the error and makes it easier for developers to look for solutions on their own.

    b. It would be good to note whether this occurs every time or if it is an intermittent issue.

3.  You should also indicate any steps that you have already taken, so that other developers know what to rule out.

4.  Other information to include would be type of device, operating system, and browser.

After reporting the bug, it’s important to follow up so that this is addressed in a timely manner.

## Known bugs

We will be documenting our “known bugs” in our [BugReport.md](./BugReport.md) tab. This will include common bugs and their behavior as well as the exact steps to fix the bug.
