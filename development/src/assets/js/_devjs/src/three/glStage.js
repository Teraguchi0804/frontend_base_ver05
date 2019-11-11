import {
	// THREE,
	PerspectiveCamera,
	Scene,
	WebGLRenderer,
	GridHelper,
	AxesHelper,
	MeshNormalMaterial,
	Group,
	SphereGeometry,
	PlaneBufferGeometry,
	Mesh,
	Math as _Math
} from 'three';

import OrbitControls from 'three-orbitcontrols';

import RawShaderMesh from './modules/RawShaderMesh';

export default class glStage {
	constructor() {

		this.$stage = $("#stage");

		// グループを作る
		this._group = new Group();

		/**
		 *
		 * @type {number}
		 * @private
		 */
		this._rendering = null;

		/**
		 *
		 * @type {PerspectiveCamera}
		 * @private
		 */
		this._camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);


		/**
		 *
		 * @type {Scene}
		 * @private
		 */
		this._scene = new Scene();

		/**
		 *
		 * @type {WebGLRenderer}
		 * @private
		 */
		this._renderer = new WebGLRenderer({
			antialias: true,
			alpha: true
		});

		/**
		 *
		 * @type {number}
		 * @private
		 */
		this._cnt = 0;

		/**
		 *
		 * @type {number}
		 * @private
		 */
		this._speed = 1;

		/**
		 *
		 * @type {{x: number, y: number}}
		 * @private
		 */
		this._mouse = {
			x: 0,
			y: 0
		};
		/**
		 *
		 * @type {{x: number, y: number}}
		 * @private
		 */
		this._mousePos = {
			x: 0,
			y: 0
		};

		/**
		 *
		 * @type {{x: number, y: number}}
		 * @private
		 */
		this._mouseRatio = {
			x: 0.01,
			y: 0.01
		};

		/**
		 *
		 * @type {number}
		 * @private
		 */
		this._initWidth = window.innerWidth;

		//


		/**
		 *
		 * @type {RawShaderMesh}
		 * @private
		 */
		this._rawShaderMesh = new RawShaderMesh(1, 1);

	}

	/**
	 *
	 * @public
	 */
	setup() {
		// this._camera.position.x = -100;
		this._camera.position.x = 0;
		this._camera.position.y = 150;
		this._camera.position.z = 800;

		// 3D空間にグループを追加する
		this._scene.add(this._group);

		// this._camera.lookAt( 0, 0, 0 );

		// ==========================================
		// 地面を作成
		this._scene.add(new GridHelper(600));
		this._scene.add(new AxesHelper(300));
		// ==========================================
		// this._renderer.setClearColor( 0x010c22, 0.0 );
		this._renderer.setClearColor(0x000000, 0.0);
		this._renderer.setSize(window.innerWidth, window.innerHeight);
		// this._renderer.setSize( this.$stage.width(), this.$stage.height() );
		this._renderer.setPixelRatio(window.devicePixelRatio);
		// ==========================================

		// this._rawShaderMesh.setup();
		// this._scene.add( this._rawShaderMesh.mesh );

		// for (let i = 0; i < 10; i++) {
		//     // 直方体を作成
		//     const material = new MeshNormalMaterial();
		//     const geometry = new SphereGeometry(30, 30, 30);
		//     const mesh = new Mesh(geometry, material);
		//     // 配置座標を計算
		//     const radian = i / 10 * Math.PI * 2;
		//     mesh.position.set(
		//       200 * Math.cos(radian), // X座標
		//       30, // Y座標
		//       200 * Math.sin(radian) // Z座標
		//     );
		//     // グループに追加する
		//     this._group.add(mesh);
		// }

		for (let i = 0; i < 6; i++) {
			// 直方体を作成
			const material = new MeshNormalMaterial();
			const geometry = new PlaneBufferGeometry(50, 100, 30);
			const mesh = new Mesh(geometry, material);
			// 配置座標を計算
			const radian = i / 10 * Math.PI * 2;
			mesh.position.set(
				200 * Math.cos(radian), // X座標
				30, // Y座標
				200 * Math.sin(radian) // Z座標
			);
			// グループに追加する
			this._group.add(mesh);
		}

		window.console.log(this._group);
		
		// ==========================================


		document.getElementById('stage').appendChild(this._renderer.domElement);

		window.addEventListener('resize', this.resize.bind(this));

		document.getElementById('stage').addEventListener('mousemove', e => {
			this._mouse = {
				x: (2 * e.clientX - window.innerWidth) / window.innerWidth,
				y: (-1 * (2 * e.clientY - window.innerHeight) / window.innerHeight)
			};
		});

		this._controls = new OrbitControls(this._camera, this._renderer.domElement);

	}

	/**
	 *
	 * @private
	 */
	_update() {

		this._controls.update();

		// this._group.rotation.y += 0.01;
		this._mousePos.x += (this._mouse.x - this._mousePos.x) * this._mouseRatio.x;
		this._mousePos.y += (this._mouse.y - this._mousePos.y) * this._mouseRatio.y;

		this._cnt += this._speed;
		this._cnt = this._cnt % 360;

		this._rawShaderMesh.update(this._cnt);
	}

	/**
	 *
	 * @public
	 */
	render() {
		this._update();

		this._renderer.render(this._scene, this._camera);

		if (this._rendering) cancelAnimationFrame(this._rendering);
		this._rendering = requestAnimationFrame(this.render.bind(this));
	}


	/**
	 * @public
	 */
	resize() {

		if (this._initWidth === window.innerWidth) {
			return;
		}

		this._camera.aspect = window.innerWidth / window.innerHeight;
		this._camera.updateProjectionMatrix();

		this._renderer.setSize(window.innerWidth, window.innerHeight);
	}

	scroll(st) {

	}
}