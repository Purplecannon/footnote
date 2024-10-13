/**
 * TODO:
 */

package src.main.java.footnoteapp;

import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Runs queries against a back-end database
 */
// public class Query extends QueryAbstract {
public class Query {
  //
  // Canned queries
  //
  private static final String CLEAR_ANNOTATIONS_SQL = "DELETE FROM ANNOTATIONS";
  private static final String CLEAR_PROJECTS_SQL = "DELETE FROM PROJECTS";
  private static final String CLEAR_USERS_SQL = "DELETE FROM USERS";

  //
  // Instance variables
  //
  private PreparedStatement clearAnnotationsStmt;
  private PreparedStatement clearProjectsStmt;
  private PreparedStatement clearUsersStmt;


  // Tracks the currently logged-in user
  private String currentUser;

  protected Query() throws SQLException, IOException {
    prepareStatements();
    currentUser = null;
  }

  /**
   * Helper method to clear the data in any custom tables created.
   * WARNING! Do not drop any tables.
   */
  public void clearTables() {
    try {
      clearAnnotationsStmt.executeUpdate();
      clearProjectsStmt.executeUpdate();
      clearUsersStmt.executeUpdate();
    } catch (SQLException e) {
      e.printStackTrace();
    }
  }

  /*
   * Prepare all the SQL statements in this method.
   */
  private void prepareStatements() throws SQLException {
    // clearAnnotationsStmt = conn.prepareStatement(CLEAR_ANNOTATIONS_SQL);
    // clearProjectsStmt = conn.prepareStatement(CLEAR_PROJECTS_SQL);
    // clearUsersStmt = conn.prepareStatement(CLEAR_USERS_SQL);
  }

  public String login(String username, String password) {
    // TODO: implement login
    try {
      // If someone has already logged in, return a message accordingly
      if (currentUser != null) {
        return "User already logged in\n";
      }

      // usernames are not case-sensitive
      String usernameLower = username.toLowerCase();


      // user successfully logs in
      currentUser = usernameLower;
      return "Logged in as " + usernameLower + "\n";
    } catch (SQLException e) {
      e.printStackTrace();
      return "Login failed\n";
    }
  }

  public String createUser(String username, String password) {
    // TODO: implement createUser
    try {
      return "Created user " + username + "\n";
    } catch (SQLException e) {
      e.printStackTrace();
      return "Failed to create user\n";
    }
  }

}
