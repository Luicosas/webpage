data = [
    {
        name: "Cool Video",
        prequsites: [
            "object 1"
        ],
        location: {
            x: 50,
            y: 50
        }, 
        color: "green", 
        iframe_src:"cool_video/main.html"
    },
    {
        name: "object 1",
        prequsites: [

        ],
        location: {
            x: 500,
            y: 100
        },
        color: "red"
    }
];

var dis = document.getElementById("mind-map");

dis.width = dis.clientWidth;
dis.height = dis.clientHeight;

var ctx = dis.getContext("2d");

var cam_x = 0, cam_y = 0, r = 10; 

var ms_x = 0, ms_y = 0;

var focus = -1, hover = -1;

dis.addEventListener("mousemove", function(event) {
    ms_x = event.offsetX;
    ms_y = event.offsetY;

    if(event.buttons % 2 == 1) {
        cam_x -= event.movementX;
        cam_y -= event.movementY;
    }
    
    if(focus != -1) {
        var crn_x = data[focus].location.x, crn_y = data[focus].location.y;
        if((crn_x - ms_x) * (crn_x - ms_y) + (crn_y - ms_x) * (crn_y - ms_y) <= r * r){
            return;
        }
    }

    closest = -1;
    /* for (var i = 0; i < data.length; i++) {
        var crn_x = data[i].location.x - cam_x;
        var crn_y = data[i].location.y - cam_y;        

        if((crn_x - ms_x) * (crn_x - ms_x) + (crn_y - ms_y) * (crn_y - ms_y) <= r * r) {
            closest = i;
            break;
        }
    } */
});

function draw() {
    ctx.clearRect(0, 0, dis.width, dis.height);
    for (var i = 0; i < data.length; i++) {
        var crn_x = data[i].location.x - cam_x;
        var crn_y = data[i].location.y - cam_y;
        ctx.beginPath();
        if(focus == i) {
            ctx.arc(crn_x, crn_y, r*1.5, 0, Math.PI * 2);
        } else {
            ctx.arc(crn_x, crn_y, r, 0, Math.PI * 2);
        }
        ctx.fillStyle = data[i].color;
        ctx.fill();

        ctx.font = "30px Arial";
        ctx.fillText(data[i].name, crn_x, crn_y - 10); 

    }
    requestAnimationFrame(draw);
}
requestAnimationFrame(draw);

dis.addEventListener("click", function(event) {
    ms_x = event.offsetX;
    ms_y = event.offsetY;

    if(event.movementX * event.movementX + event.movementY * event.movementY < 10) {
        for (var i = 0; i < data.length; i++) {
            var crn_x = data[i].location.x - cam_x;
            var crn_y = data[i].location.y - cam_y;
            
            if((crn_x - ms_x) * (crn_x - ms_x) + (crn_y - ms_y) * (crn_y - ms_y) <= r * r) {
                if(i != focus) {
                    focus = i;
                    var panels = document.getElementsByClassName("Panel");
                    panels[0].src = data[i].iframe_src;
                }
                break;
            }
        }
    }
});