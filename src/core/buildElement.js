// Object for caching processed text values
const memoizedText = {};
// Function to retrieve or compute a formatted text value
function getText(text) {
  // Check if the text has been processed and cached; return it if so
  if (memoizedText[text] !== undefined) {
    return memoizedText[text];
  }

  // If it's the first time, compute the formatted text
  const result = typeof text === "string"
    ? text.replace(/\\x([0-9A-Fa-f]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    : String(text);

  // Cache the result for future use
  memoizedText[text] = result;

  // Return the processed text
  return result;
}

// Object for caching converted style keys
const memoizedStyleKeys = {};

// Function to convert camelCase into kebab-case for CSS properties
function getStyleKey(key) {
  // Check if the key is already processed and return the cached value if so
  if (memoizedStyleKeys[key] !== undefined) {
    return memoizedStyleKeys[key];
  }

  // Convert camelCase to kebab-case
  const styleKey = key.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  // Store the result in cache
  memoizedStyleKeys[key] = styleKey;

  // Return the converted key
  return styleKey;
}

// WeakMap to store event listeners for each element
const eventListeners = new WeakMap();

/**
 * Builds and returns an HTML element based on the provided tag and options.
 *
 * @param {string} tag - The HTML tag for the element.
 * @param {Object} [options] - The options for configuring the element.
 * @param {string} [options.id=""] - The ID of the element.
 * @param {string} [options.classList=""] - The space-separated list of classes for the element.
 * @param {Array} [options.children=[]] - The array of child elements.
 * @param {Object} [options.attributes={}] - The key-value pairs of attributes for the element.
 * @param {Object} [options.events={}] - The key-value pairs of event listeners for the element.
 * @param {string} [options.text=""] - The text content of the element.
 * @param {Object} [options.style={}] - The key-value pairs of inline styles for the element.
 * @returns {HTMLElement} - The constructed HTML element.
 */
export default function buildElement(tag, options = { id: "", classList: "", children: [], attributes: {}, events: {}, text: "", style: {} }) {
  // Return empty string if tag is not provided
  if (!tag) return "";
  // Destructure and provide default values for the options parameter
  const { id = "", classList = "", children = [], attributes = {}, events = {}, text = "", style = {} } = options;

  // Create a new HTML element
  const element = document.createElement(tag);

  // Set the element ID if provided
  if (id) element.id = id;

  // Add class(es) to the element if any are provided
  if (classList) {
    for (let className of classList.split(" ")) {
      if (className) element.classList.add(className);
    }
  }

  // Set the attributes for the element
  for (const [key, value] of Object.entries(attributes)) {
    // Attributes like disabled, checked, selected need special handling
    if (key === "disabled" || key === "checked" || key === "selected") {
      if (value) element.setAttribute(key, value);
    }
    else element.setAttribute(key, value);
  }

  // Retrieve or create the event listeners Map for this particular element
  let elementEvents = eventListeners.get(element);
  if (!elementEvents) {
    elementEvents = new Map();
    eventListeners.set(element, elementEvents);
  }

  // Attach events to the element
  for (const [key, value] of Object.entries(events)) {
    // Remove existing event listener if present before adding a new one
    if (elementEvents.has(key)) {
      element.removeEventListener(key, elementEvents.get(key));
    }

    // Add new event listener and update the storage Map
    element.addEventListener(key, value);
    elementEvents.set(key, value);
  }

  // Apply inline style to the element by converting keys from camelCase
  for (const [key, value] of Object.entries(style)) {
    const styleKey = getStyleKey(key);
    element.style[styleKey] = value;
  }

  // Set the text content of the element after processing
  if (text) element.textContent = getText(text);
  
  // Create a Document Fragment to efficiently append children
  const fragment = document.createDocumentFragment();

  // Append each child to the fragment
  if (children) {
    for (const child of children) {
      // Skip if child is not valid
      if (!child) continue;
      // Recursively build and append child element
      const { tag, options } = child;
      fragment.append(buildElement(tag, options));
    }

    // Append all children at once to the parent element
    element.append(fragment);
  }

  // Return the fully constructed element
  return element;
}
