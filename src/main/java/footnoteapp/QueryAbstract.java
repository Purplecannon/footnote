/**
 * TODO:
 * - initialize the conn variable to establish a connection to the database
 * - further define the methods
 */

package src.main.java.footnoteapp;

import java.sql.Connection;

public abstract class QueryAbstract {
  // DB Connection
  protected Connection conn;
}

/**
   * Takes a user's username and password and attempts to log the user in.
   *
   * @param username user's username
   * @param password user's password
   *
   * @return If someone has already logged in, then return "User already logged in\n".  For all
   *         other errors, return "Login failed\n". Otherwise, return "Logged in as [username]\n".
   */
  public abstract String login(String username, String password);

  /**
   * Creates a new user within the system.
   *
   * @param username   new user's username. User names are unique within the system.
   * @param password   new user's password.
   *
   * @return either "Created user {@code username}\n" or "Failed to create user\n" if failed.
   */
  public abstract String createUser(String username, String password);