var canvas;
var context;
var X, Y;

function init()
{
    canvas = document.getElementById('canvas');
    context = canvas.getContext("2d");
    draw_axis();
}

function draw_axis()
{
    X = canvas.width;
    Y = canvas.height;
    
    context.clearRect(0, 0, X, Y);
    canvas.width = 1;
    canvas.width = X;

    
    context.moveTo(X/2, 0);
    context.lineTo(X/2, Y);
    
    context.moveTo(0, Y/2);
    context.lineTo(X, Y/2);
    
    context.stroke();
}


function plot()
{
    var a,h,b,g,f,c;
    
    a = parseFloat(document.getElementById("field_a").value);
    h = parseFloat(document.getElementById("field_h").value);
    b = parseFloat(document.getElementById("field_b").value);
    g = parseFloat(document.getElementById("field_g").value);
    f = parseFloat(document.getElementById("field_f").value);
    c = parseFloat(document.getElementById("field_c").value);
    
    var quadA, quadB, quadC, quadD, rootD, coorX, coorY, plotX, plotY;
    var path = new Array();
    var j = 0;
    var started = false;
    
    quadA = b;
    for (var i = 0; i < X; i++)
    {
        coorX = i - X / 2;
        quadB = 2 * (h * coorX + f);
        quadC = a * coorX * coorX + 2 * g * coorX + c;
        if (quadA != 0)
        {
            quadD = quadB * quadB - 4 * quadA * quadC;
            if (quadD > 0)
            {
                rootD = Math.sqrt(quadD);
                plotX = X / 2 + coorX;
                
                coorY = (-quadB + rootD) / (2 * quadA);
                plotY = Y / 2 - coorY;
                if (plotY >= 0 && plotY < Y)
                {
                    if(started)
                    {
                        context.lineTo(plotX, plotY);
                    }
                    else
                    {
                        context.moveTo(plotX, plotY);
                        started = true;
                    }
                }
                coorY = (-quadB - rootD) / (2 * quadA);
                plotY = Y / 2 - coorY;
                if (plotY >= 0 && plotY < Y)
                {
                    path[j] = [plotX, plotY];
                    j++;
                }
            }
        }
        else if (quadB != 0)
        {
            coorY = -quadC / quadB;
            if(started)
            {
                context.lineTo(X / 2 + coorX, Y / 2 - coorY);
            }
            else
            {
                context.moveTo(X / 2 + coorX, Y / 2 - coorY);
                started = true;
            }
        }
    }
    context.stroke();
    if (j > 1)
    {
        context.moveTo(path[0][0], path[0][1]);
        for (var i = 1; i < j; i++)
            context.lineTo(path[i][0], path[i][1]);
        context.stroke();
    }
}
