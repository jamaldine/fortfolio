$(document).ready(function() {
    $(function() {
        $.getJSON('../data.json', function(data) {
            const schema1 = '<section class="home-skills">' +
                '<h2 class="skill-title">' + data.webIntegrator.name + '</h2>' +
            '</section>';
            $(schema1).appendTo(".home-right");
            $.each(data.webIntegrator.skills, function(k, skill) {
                if (skill.type === "groupe-skills") {
                    $.each(skill.list, function(i, item) {
                        const l = k + i;
                        const schema5 = `<div class='skills-list skills-list-${k+i}'></div>`;
                        $(schema5).appendTo('.home-skills');
                        const schema2 = '<div class="circle-skill">' +
                            '<div class="circle">' +
                                '<i class="' + item.img + '"></i>'+
                            '</div>' +
                            '<div class="skill">' +
                                '<div class="name-percent">' +
                                    '<div class="name">' + item.name + '</div>' +
                                    '<div class="percent">' + item.percent + '</div>' +
                                '</div>' +
                                '<ul class="breadcrumb breadcrumb-' + l + '">' +
                                '</ul>' +
                            '</div>' +
                        '</div>';
                        $(schema2).appendTo(`.skills-list-${k+i}`);

                        $.each(item.skillsItem, function(j,skillItem) {
                            console.log(skillItem, i + k);
                            const schema3 = '<li class="breadcrumb-item"><a class="breadcrumb-name"" href="#">'+skillItem.name+'</a></li>';
                            $(schema3).appendTo(`.breadcrumb-${i + k}`);
                        });/**/

                    });
                }
                /*else if (skill.type === 'single-skills') {
                    $.each(skill.list, function(j, item) {
                        const schema6 = `<div class="single-item single-item-${j}"></div>`;
                        $(schema6).appendTo('.home-skills');
                        const schema4 = '<div class="single-name">' + item.name + '</div>';
                        $(schema4).appendTo(`.single-item-${j}`);
                    });
                }*/
            });
        });
    });
});
