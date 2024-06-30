let scene, camera, renderer, player, obstacles, score = 0;
let jumping = false, canJump = true;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create player
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    player = new THREE.Mesh(geometry, material);
    player.position.y = 0.5;
    scene.add(player);

    // Create ground
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    camera.position.z = 5;
    camera.position.y = 2;

    obstacles = [];
    spawnObstacle();

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    animate();
}

function spawnObstacle() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const obstacle = new THREE.Mesh(geometry, material);
    obstacle.position.z = -20;
    obstacle.position.x = Math.random() * 4 - 2;
    obstacle.position.y = 0.5;
    scene.add(obstacle);
    obstacles.push(obstacle);
}

function onKeyDown(event) {
    if (event.keyCode === 32 && canJump) { // Space bar
        jumping = true;
        canJump = false;
    }
}

function onKeyUp(event) {
    if (event.keyCode === 32) { // Space bar
        jumping = false;
    }
}

function animate() {
    requestAnimationFrame(animate);

    // Player movement
    if (jumping && player.position.y < 2) {
        player.position.y += 0.2;
    } else if (player.position.y > 0.5) {
        player.position.y -= 0.1;
        if (player.position.y <= 0.5) {
            player.position.y = 0.5;
            canJump = true;
        }
    }

    // Obstacle movement
    obstacles.forEach((obstacle, index) => {
        obstacle.position.z += 0.1;
        if (obstacle.position.z > 5) {
            scene.remove(obstacle);
            obstacles.splice(index, 1);
            score++;
            document.getElementById('score').innerText = `Score: ${score}`;
        }

        // Collision detection
        if (Math.abs(obstacle.position.x - player.position.x) < 0.5 &&
            Math.abs(obstacle.position.z - player.position.z) < 0.5 &&
            Math.abs(obstacle.position.y - player.position.y) < 0.5) {
            alert(`Game Over! Your score: ${score}`);
            location.reload();
        }
    });

    if (Math.random() < 0.02) {
        spawnObstacle();
    }

    renderer.render(scene, camera);
}

init();
