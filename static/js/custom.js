(function () {
  const scrollY = 140;
  const defaultClass = "py-2 border-transparent";
  const activeClass = "py-2 bg-white/80 border-gray-200 backdrop-blur-lg text-slate-bold";


  // @ts-nocheck
  let lastKnownScrollPosition = 0;
  let ticking = false;

  const header = document.querySelector(".impronav-sticky-header");


  // Define two different scroll positions
  const addScrollY = Math.max(scrollY, 100); // Scroll position to add active class
  const removeScrollY = Math.max(scrollY - 50, 50); // Scroll position to remove active class

  function updateAnimation(scrollPos) {
    if (scrollPos > addScrollY) {
      header.classList.remove(...defaultClass.split(" "));
      header.classList.add("is-active", ...activeClass.split(" "));
      header.setAttribute("active", "");

    } else if (scrollPos < removeScrollY) {
      header.classList.remove("is-active", ...activeClass.split(" "));
      header.classList.add(...defaultClass.split(" "));
      header.removeAttribute("active");

    }
  }

  window.addEventListener("scroll", function () {
    lastKnownScrollPosition = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateAnimation(lastKnownScrollPosition);
        ticking = false;
      });

      ticking = true;
    }
  });
})();

(function () {
  const closeOnClick = false;

  ['DOMContentLoaded', 'impro:after-swap'].forEach((event) => {
    document.addEventListener(event, addListeners);
  });

  // Function to clone and replace elements
  function cloneAndReplace(element) {
    const clone = element.cloneNode(true);
    element.parentNode.replaceChild(clone, element);
  }

  function addListeners() {
    // Clean up existing listeners
    const oldMenuButton = document.getElementById('impronav-menu');
    if (oldMenuButton) {
      cloneAndReplace(oldMenuButton);
    }

    const oldDropdownMenus = document.querySelectorAll('.impronav-dropdown');
    oldDropdownMenus.forEach((menu) => {
      cloneAndReplace(menu);
    });

    // Mobile nav toggle
    const menuButton = document.getElementById('impronav-menu');
    menuButton && menuButton.addEventListener('click', toggleMobileNav);

    // Dropdown menus
    const dropdownMenus = document.querySelectorAll('.impronav-dropdown');
    dropdownMenus.forEach((menu) => {
      const button = menu.querySelector('button');
      button &&
        button.addEventListener('click', (event) =>
          toggleDropdownMenu(event, menu, dropdownMenus)
        );

      // Handle Submenu Dropdowns
      const dropDownSubmenus = menu.querySelectorAll('.impronav-dropdown-submenu');

      dropDownSubmenus.forEach((submenu) => {
        const submenuButton = submenu.querySelector('button');
        submenuButton &&
          submenuButton.addEventListener('click', (event) => {
            event.stopImmediatePropagation();
            toggleSubmenuDropdown(event, submenu);
          });
      });
    });

    // Clicking away from dropdown will remove the dropdown class
    document.addEventListener('click', closeAllDropdowns);

    if (closeOnClick) {
      handleCloseOnClick();
    }
  }

  function toggleMobileNav() {
    [...document.querySelectorAll('.impronav-toggle')].forEach((el) => {
      el.classList.toggle('hidden');
    });
  }

  function toggleDropdownMenu(event, menu, dropdownMenus) {
    toggleMenu(menu);

    // Close one dropdown when selecting another
    Array.from(dropdownMenus)
      .filter((el) => el !== menu && !menu.contains(el))
      .forEach(closeMenu);

    event.stopPropagation();
  }

  function toggleSubmenuDropdown(event, submenu) {
    event.stopPropagation();
    toggleMenu(submenu);

    // Close sibling submenus at the same nesting level
    const siblingSubmenus = submenu
      .closest('.impronav-dropdown')
      .querySelectorAll('.impronav-dropdown-submenu');
    Array.from(siblingSubmenus)
      .filter((el) => el !== submenu && !submenu.contains(el))
      .forEach(closeMenu);
  }

  function closeAllDropdowns(event) {
    const dropdownMenus = document.querySelectorAll('.dropdown-toggle');
    const dropdownParent = document.querySelectorAll(
      '.impronav-dropdown, .impronav-dropdown-submenu'
    );
    const isButtonInsideDropdown = [
      ...document.querySelectorAll(
        `.impronav-dropdown button, .impronav-dropdown label, .impronav-dropdown input,
  .impronav-dropdown-submenu button, .impronav-dropdown-submenu label, .impronav-dropdown-submenu input,
  #impronav-menu`
      )
    ].some((button) => button.contains(event.target));
    if (!isButtonInsideDropdown) {
      dropdownMenus.forEach((d) => {
        // console.log("I ran", d);
        // if (!d.contains(event.target)) {
        d.classList.remove('open');
        d.removeAttribute('open');
        d.classList.add('hidden');
        // }
      });
      dropdownParent.forEach((d) => {
        d.classList.remove('open');
        d.removeAttribute('open');
        d.setAttribute('aria-expanded', 'false');
      });
    }
  }

  function toggleMenu(menu) {
    menu.classList.toggle('open');
    const expanded = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    menu.hasAttribute('open')
      ? menu.removeAttribute('open')
      : menu.setAttribute('open', '');

    const dropdownToggle = menu.querySelector('.dropdown-toggle');
    const dropdownExpanded = dropdownToggle.getAttribute('aria-expanded');
    dropdownToggle.classList.toggle('hidden');
    dropdownToggle.setAttribute(
      'aria-expanded',
      dropdownExpanded === 'true' ? 'false' : 'true'
    );
  }

  function closeMenu(menu) {
    // console.log("closing", menu);
    menu.classList.remove('open');
    menu.removeAttribute('open');
    menu.setAttribute('aria-expanded', 'false');
    const dropdownToggles = menu.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach((toggle) => {
      toggle.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
    });
  }

  function handleCloseOnClick() {
    const navMenuItems = document.querySelector('.impronav-items');
    const navToggle = document.getElementById('impronav-menu');
    const navLink = navMenuItems && navMenuItems.querySelectorAll('a');

    const MenuIcons = navToggle.querySelectorAll('.impronav-toggle');

    navLink &&
      navLink.forEach((item) => {
        item.addEventListener('click', () => {
          navMenuItems?.classList.add('hidden');
          MenuIcons.forEach((el) => {
            el.classList.toggle('hidden');
          });
        });
      });
  }
})();

window.addEventListener('scroll', () => {
  const section = document.querySelector('.sectionabout');
  const dot = document.getElementById('scroll-dot');

  const sectionTop = section.getBoundingClientRect().top;
  const sectionHeight = section.getBoundingClientRect().height;
  const windowHeight = window.innerHeight;

  // Calculate the scroll progress within the section
  const scrollProgress = Math.min(Math.max((windowHeight - sectionTop) / (windowHeight + sectionHeight), 0), 1);

  // Set the dot's position based on scroll progress
  dot.style.transform = `translateY(${scrollProgress * (sectionHeight - dot.offsetHeight)}px)`;
});
