Exams.Canvas = class {
    constructor() {
        this.$canvas = $("[data-view3d='wrapper']")
        this.data = $("[data-view3d='wrapper']").data().exam
        this.group = new THREE.Group()
    }

    init() {
        this.initRenderer()
        this.initCamera()
        this.initScene()
        this.initControls()
        this.PoOrLine()
        this.NALine()
        this.preRender()
        this.animate()
    }

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setSize(this.$canvas.innerWidth(), 500)
        this.$canvas.append(this.renderer.domElement)
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera(45, this.$canvas.innerWidth() / 500, 1, 10000)
        this.camera.position.z = 700
    }

    initScene() {
        this.scene = new THREE.Scene()
    }

    initControls() {
        this.controls = new THREE.TrackballControls(this.camera, this.renderer.domElement)
    }

    PoOrLine() {
        var points = []
        points.push(new THREE.Vector3(this.data.point_po.x, this.data.point_po.y, 0))
        points.push(new THREE.Vector3(this.data.point_or.x, this.data.point_or.y, 0))

        this.drawLine(points , 65)
    }

    NALine() {
        var points = []
        points.push(new THREE.Vector3(this.data.point_n.x, this.data.point_n.y, 0))
        points.push(new THREE.Vector3(this.data.point_a.x, this.data.point_a.y, 0))

        this.drawLine(points)
    }

    drawLine(points = [], intersection = 0){
        var materialPoint = new THREE.PointsMaterial({ color: 0x00ff00, size:15 })
        var materialLine = new THREE.LineBasicMaterial({ color: 0x0000ff })

        var geometryPoint = new THREE.BufferGeometry().setFromPoints(points)

        points[0].x = parseFloat(points[0].x) - intersection;
        points[1].x = parseFloat(points[1].x) + intersection;

        var geometryLine = new THREE.BufferGeometry().setFromPoints(points)
        
        var point = new THREE.Points(geometryPoint,materialPoint)
        var line = new THREE.Line(geometryLine, materialLine)

        this.group.add(point)
        this.group.add(line)
    }

    preRender(){
        this.scene.add(this.group)
        var box3 = new THREE.Box3().setFromObject(this.group)

        this.camera.position.x = box3.getCenter().x
        this.camera.position.y = box3.getCenter().y

        this.controls.target = box3.getCenter()
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this))
        this.controls.update()
        this.renderer.render(this.scene, this.camera)
    }

}