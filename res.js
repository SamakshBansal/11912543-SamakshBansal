var navBar = document.getElementById("nav-bar");
var activeClass = "nav-link-active";

function getTheClosest(key, selector) {
  var keyParent = key.parentElement;
  while (key && keyParent) {
    if (keyParent === keyParent.parentElement.querySelector(selector)) {
      return keyParent;
    } else {
      keyParent = keyParent.parentElement;
    }
  }
  return null;
}

function activateNavLink(activeLink) {
  let activeLinkId = activeLink.getAttribute("id");
  let theClosestNav = getTheClosest(activeLink, "nav");
  let notActiveLinks = theClosestNav.querySelectorAll(
    "a:not([id=" + activeLinkId + "])"
  );
  activeLink.classList.add(activeClass);
  notActiveLinks.forEach((notActiveLink) => {
    notActiveLink.classList.remove(activeClass);
  });
}

navBar.addEventListener("click", function (event) {
  if (event.target && event.target.nodeName === "A") {
    let navLink = event.target;
    activateNavLink(navLink);
  }
});

function scroll(content) {
  const windowHeight = window.innerHeight;
  const scrollEffectHeight = content.offsetTop - windowHeight / 2;
  let navLinkHref = "#" + content.getAttribute("id");
  let navLink = navBar.querySelector('a[href="' + navLinkHref + '"]');

  if (
    document.body.scrollTop > scrollEffectHeight ||
    document.documentElement.scrollTop > scrollEffectHeight
  ) {
    activateNavLink(navLink);
  } else {
    navLink.classList.remove(activeClass);
  }
}

window.addEventListener("scroll", function () {
  let sections = document.querySelectorAll(".main section");
  sections.forEach((section) => {
    scroll(section);
  });
});
