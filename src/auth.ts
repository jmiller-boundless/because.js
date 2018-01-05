/**
 * This file defines some simple types for representing data associated with
 * authentication.
 */

/** This line does nothing but make typedoc render the module comment. */

/**
 * Simple type wrapper to help avoid mixing up usernames with other data stored
 * in strings.
 */
export class Username extends String {
}

/**
 * Simple type wrapper to help avoid mixing up passwords with other data stored
 * in strings.
 */
export class Password extends String {
}

/**
 * Simple type wrapper to help avoid mixing up passwords with other data stored
 * in strings.
 */
export class Key extends String {
}
