$(document).ready(() => {
  $(".navbar_wraper").load("./common/navbar.html");
  $("#root").load("./common/home-section.html");
  setTimeout(() => {
    skillsHome();
  }, 50);
});

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
