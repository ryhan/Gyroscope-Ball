var ball = document.getElementById("ball");

var diameter = 40;

var vector = function(x,y){
	this.x = x;
	this.y = y;
}

var position = new vector( 0, 0),
    velocity = new vector( 0, 0),
    acceleration = new vector( 0, 0);

if ( window.DeviceMotionEvent != undefined ) 
{
	window.ondevicemotion = function(e) 
	{
		var gravity = event.accelerationIncludingGravity;

		acceleration.x = gravity.x * 5;
		acceleration.y = gravity.y * 5;
	}

	setInterval( function()
	{
		var landscape = (window.innerWidth / window.innerHeight > 1);

		if ( landscape )
		{
			velocity.x -= acceleration.y;
			velocity.y -= acceleration.x;
		}
		else
		{
			velocity.x -= acceleration.x;
			velocity.y += acceleration.y;
		}

		velocity.x *= 0.98;
		velocity.y *= 0.98;

		position.x = parseInt( position.x + velocity.x / 50);
		position.y = parseInt( position.y + velocity.y / 50);

		checkBounds();

		ball.style.left = position.x + 'px';
		ball.style.top = position.y + 'px';

	}, 25);
}

function checkBounds()
{
	if ( position.x < 0 )
	{
		position.x = 0;
		velocity.x *= -1;
	}

	if ( position.y < 0 )
	{
		position.y = 0;
		velocity.y *= -1;
	}

	var windowWidth = document.documentElement.clientWidth,
		windowHeight = document.documentElement.clientHeight;

	if ( position.x > windowWidth - diameter )
	{
		position.x = windowWidth - diameter;
		velocity.x *= -1;
	}

	if ( position.y > windowHeight - diameter )
	{
		position.y = windowHeight - diameter;
		velocity.y *= -1;
	}
}



