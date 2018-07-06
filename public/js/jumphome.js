/*from resource
https://github.com/stonecape/COMSM0104-MoiveGrail
*/
$(function () {

       setTimeout(ChangeTime, 1000);

   });

function ChangeTime() {

    var time;

    time = $("#time").text();

    time = parseInt(time);

    time--;

    if (time <= 0) {

        window.location.href = "/";

    } else {

        $("#time").text(time);

        setTimeout(ChangeTime, 1000);

    }

}