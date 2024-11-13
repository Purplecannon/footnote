# Known Bugs

- [Timestamp Malfunction in Annotation Component](#bug-report-timestamp-malfunction-in-annotation-component)

---

### **Bug Report: Timestamp Malfunction in Annotation Component**

**Summary:**

Annotation component's timestamp button always displays "00:00" and fails to reflect playback timestamps from the sibling video component.

**Component:**

Annotation Component (child of Project Page, Frontend)

**Version:**

Initial beta release.

**Operating System:**

All platforms.

**Description:**

The Annotation component, which is part of the frontend system and a child component of the Project Page, is not functioning as expected regarding the timestamp button. The button is supposed to display the playback timestamp corresponding to each annotation item and update dynamically when new annotations are added. Currently, it:

- Always displays 00:00 for all annotations.
- Fails to generate correct timestamps when new annotations are added.
- Does not communicate to the VideoPlayer component or backend.

The issue arises due to the absence of a child component in the Annotation component to track and retrieve playback timestamps from the sibling video component.

**Steps to Reproduce:**

1. Navigate to the Project Page in the frontend.
2. View the list of annotations displayed in the Annotation component.
3. Observe that all timestamp buttons display 00:00.
4. Add a new annotation via the Annotation component.
5. Observe that the timestamp for the new annotation is also 00:00.
6. Click it any existing timestamp and observe that it doesn't do anything.

**Expected Results:**

- Each annotation's timestamp button should display the correct playback timestamp corresponding to that annotation.
- When a new annotation is added, it should dynamically generate and display the corresponding playback timestamp.
- When communicating with backend about annotations, the timestamp info should be included.

**Actual Results:**

- All annotation timestamp buttons display 00:00.
- Adding new annotations does not generate timestamps dynamically, and the timestamp remains 00:00.

**Additional Information:**

- The issue does not cause the application to crash but limits the usability of the Annotation component.
- This functionality is crucial for synchronizing annotations with video playback and ensuring accurate annotation tracking.

---
