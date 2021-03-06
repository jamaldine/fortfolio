$(document).ready(function () {
  const navbarComponent = document.querySelector(".navbar-component");
  let classList;
  let active;
  //nav-menu
  const navMenu = navbarComponent.querySelector(".nav-menu");
  const navItemMenu = navMenu.querySelectorAll(".nav-item");
  navItemMenu.forEach((item) => {
    item
      .querySelector(".nav-link")
      .addEventListener("click", displayContentPhone);
    classList = item.querySelector(".nav-link").className.split(/\s+/);
    for (var i = 0; i < classList.length; i++) {
      if (classList[i] == "active") {
        active = item.querySelector(".nav-link");
      }
    }
  });
  //nav loaded
  let bars = document.querySelector(".bars");
  bars.addEventListener("click", displayMenu);
});

function displayMenu() {
  let logo = document.querySelector(".logo");
  let bars = document.querySelector(".bars");
  let first = document.querySelector(".first");
  let second = document.querySelector(".second");
  let third = document.querySelector(".third");
  let navMenu = document.querySelector(".nav-menu");
  logo.classList.toggle("logo-animation");
  bars.classList.toggle("right");
  first.classList.toggle("first-animation");
  second.classList.toggle("second-animation");
  third.classList.toggle("d-none");
  navMenu.classList.toggle("d-none");
}

function displayContentPhone() {
  let navItem = document
    .querySelector(".navbar-component")
    .querySelector(".nav-menu")
    .querySelectorAll(".nav-item");
  navItem.forEach((item) => {
    item.querySelector(".nav-link ").classList.remove("active");
  });
  console.log("this", this);
  this.classList.add("active");
  changeContent(this);
}

function changeContent(navlink) {
  displayMenu();
  if (navlink.classList.contains("home")) {
    $("#root").load("../common/home-section.html");

    //trigger mainFunctions.js

    setTimeout(() => {
      skillsHome();
    }, 50);
    function skillsHome() {
      let skills = document.querySelector("ul.skills");
      let skillItem = skills.querySelectorAll(".skill-item");
      skillItem.forEach((item) => {
        item
          .querySelector(".skill-item-name")
          .addEventListener("click", slideContent);
      });

      //load skills for home
      $.getJSON("../data.json", function (data) {
        schemaSkills(data.webIntegrator);
      });
    }

    function slideContent() {
      const skillItem = document
        .querySelector("ul.skills")
        .querySelectorAll(".skill-item");
      skillItem.forEach((item) => {
        const path = item.querySelector(".skill-item-name svg path");
        path.classList.remove("active");
      });
      const newPath = this.querySelector("svg path");

      const clickedIem = this.querySelector(".skill-item-name-txt");
      uploadSkill(clickedIem);

      newPath.classList.add("active");
    }

    function uploadSkill(clickedIem) {
      $(clickedIem).hasClass("ui-designer");

      if ($(clickedIem).hasClass("web-integrator")) {
        $(".home-skills").remove();
        //load skills for home
        $.getJSON("../data.json", function (data) {
          schemaSkills(data.webIntegrator);
        });
      }

      if ($(clickedIem).hasClass("front-end-developer")) {
        $(".home-skills").remove();
        //load skills for home
        $.getJSON("../data.json", function (data) {
          schemaSkills(data.FrontEndDeveloper);
        });
      }

      if ($(clickedIem).hasClass("ui-designer")) {
        $(".home-skills").remove();
        //load skills for home
        $.getJSON("../data.json", function (data) {
          schemaSkills(data.UIDesigner);
        });
      }

      if ($(clickedIem).hasClass("back-end-developer")) {
        $(".home-skills").remove();
        //load skills for home
        $.getJSON("../data.json", function (data) {
          schemaSkills(data.BackEndDeveloper);
        });
      }

      if ($(clickedIem).hasClass("devops")) {
        $(".home-skills").remove();
        //load skills for home
        $.getJSON("../data.json", function (data) {
          schemaSkills(data.Devops);
        });
      }
    }
  }
  if (navlink.classList.contains("about")) {
    $("#root").load("../common/about-section.html");
    setTimeout(function () {
      const medias = document.querySelector(".medias");
      medias.classList.add("d-none");
      medias.classList.remove("d-none");
      slickCarousel();
      control();
    }, 50);

    //here my new code
    $.getJSON("../certifications.json", function (data) {
      schemaCertifications(data);
    });
  }
  if (navlink.classList.contains("work")) {
    $("#root").load("../common/work-section.html");
  }
  if (navlink.classList.contains("interests")) {
    $("#root").load("../common/interests-section.html");
  }
  if (navlink.classList.contains("contact")) {
    $("#root").load("../common/contact-section.html");
  }
}

function slickCarousel() {
  $(".medias-content").slick({
    slidesToShow: 3,
    dots: true,
    centerMode: true,
  });
}

function control() {
  //change text of prev and next btn
  const prev = document.querySelector(".slick-prev");
  const next = document.querySelector(".slick-next");

  prev.textContent = "";
  prev.innerHTML = '<i class="fa fa-chevron-left"></i>';

  next.textContent = "";
  next.innerHTML = '<i class="fa fa-chevron-right"></i>';
}

function schemaCertifications(data) {
  const schema1 =
    `<div class='certitficationItems'>` +
    `<div class='certification-title'>` +
    `<div class='enplus'>And also ...</div>` +
    `<div class='enplusTitle'>My certificates in different technology</div>` +
    `</div>` +
    '<div class="my-certifications">' +
    "</div>" +
    `</div>`;
  $(schema1).appendTo(".certifications");

  $.each(data.Certifications, function (i, certification) {
    const schema2 =
      `<div class='certification-item certification-item-${i}'>` +
      `<div class='all-certifItem'>` +
      `<div class='certification-name'>${certification.name}</div>` +
      `<div class='image-certification'><img class='img-certification' src=${certification.image} alt=${certification.name} /></div>` +
      `<div class='certification-link'><a target='_blank' class='certif-link' href=${certification.link}>See certification</a></div>` +
      `</div>` +
      `</div>`;
    $(schema2).appendTo(".my-certifications");
  });
}

function schemaSkills(data) {
  const schema1 =
    '<section class="home-skills">' +
    '<div class="title-skills">' +
    '<h2 class="skill-title">' +
    data.name +
    "</h2>" +
    "</div>" +
    "</section>";
  $(schema1).appendTo(".home-right");
  if (data.img !== "") {
    const imgSchema =
      '<div class="circle-skill">' +
      '<div class="circle">' +
      '<i class="' +
      data.img +
      '"></i>' +
      "</div>" +
      "</div>";
    $(imgSchema).appendTo(".title-skills");
  }
  $.each(data.skills, function (k, skill) {
    if (skill.type === "groupe-skills") {
      $.each(skill.list, function (i, item) {
        const l = k + i;
        const schema5 = `<div class='skills-list skills-list-${k + i}'></div>`;
        $(schema5).appendTo(".home-skills");
        let schema2;

        if (item.skillsItem.length === 0) {
          if (item.img !== "") {
            schema2 =
              '<div class="circle-skill">' +
              '<div class="circle">' +
              '<i class="' +
              item.img +
              '"></i>' +
              "</div>" +
              '<div class="skill">' +
              '<div class="name-percent">' +
              '<div class="name">' +
              item.name +
              "</div>" +
              "</div>" +
              "</div>" +
              "</div>";
          } else {
            schema2 =
              '<div class="circle-skill">' +
              '<div class="skill">' +
              '<div class="name-percent">' +
              '<div class="name">' +
              item.name +
              "</div>" +
              "</div>" +
              "</div>" +
              "</div>";
          }
        } else {
          if (item.img !== "") {
            schema2 =
              '<div class="circle-skill">' +
              '<div class="circle">' +
              '<i class="' +
              item.img +
              '"></i>' +
              "</div>" +
              '<div class="skill">' +
              '<div class="name-percent">' +
              '<div class="name">' +
              item.name +
              "</div>" +
              "</div>" +
              '<ul class="breadcrumb breadcrumb-' +
              l +
              '">' +
              "</ul>" +
              "</div>" +
              "</div>";
          } else {
            schema2 =
              '<div class="circle-skill">' +
              '<div class="skill">' +
              '<div class="name-percent">' +
              '<div class="name">' +
              item.name +
              "</div>" +
              "</div>" +
              '<ul class="breadcrumb breadcrumb-' +
              l +
              '">' +
              "</ul>" +
              "</div>" +
              "</div>";
          }
        }

        $(schema2).appendTo(`.skills-list-${k + i}`);

        $.each(item.skillsItem, function (j, skillItem) {
          let schema3;

          schema3 =
            '<li class="breadcrumb-item"><a class="breadcrumb-name"" href="#">' +
            skillItem.name +
            "</a></li>";
          $(schema3).appendTo(`.breadcrumb-${i + k}`);
        });
      });
    } else if (skill.type === "single-skills") {
      const schema7 = `<div class="single-item single-${k}"></div>`;
      $(schema7).appendTo(".home-skills");
      $.each(skill.list, function (j, item) {
        const schema6 = `<div class="single single-item-${j}"></div>`;
        $(schema6).appendTo(`.single-${k}`);
        const schema4 = '<div class="single-name">' + item.name + "</div>";
        $(schema4).appendTo(`.single-${k} .single-item-${j}`);
      });
    }
  });
}
