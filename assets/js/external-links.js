// Wait until the entire HTML document has been loaded and parsed
document.addEventListener("DOMContentLoaded", function () {
  
    // Select all anchor tags that have an href attribute
    const links = document.querySelectorAll("a[href]");
  
    // Loop through each link on the page
    links.forEach(link => {
  
      // Check if the link points to a different domain (i.e., is external)
      const isExternal = link.hostname && link.hostname !== location.hostname;
  
      // If it's an external link, modify it
      if (isExternal) {
        link.setAttribute("rel", "nofollow");       // Tell search engines not to follow it
        link.setAttribute("target", "_blank");      // Open in a new browser tab
      }
    });
  });
  