CREATE TABLE categoria
(
    categora_id SMALLSERIAL NOT NULL,
    nombre VARCHAR(60) NOT NULL,
    imagen VARCHAR(300) NOT NULL,
    descripcion VARCHAR(150) NOT NULL,
    PRIMARY KEY (categora_id),
    UNIQUE (nombre)
);

CREATE TABLE tipo_id
(
    id_tipo_id CHAR NOT NULL,
    nombre VARCHAR(35) NOT NULL,
    PRIMARY KEY (id_tipo_id),
    UNIQUE (nombre)
);

CREATE TABLE usuario
(
    usuario_id BIGSERIAL NOT NULL,
    cuenta_id VARCHAR(80) NOT NULL,
    correo VARCHAR(200) NOT NULL,
    nombre VARCHAR(200) NOT NULL,
    admin BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (usuario_id),
    UNIQUE (correo),
    UNIQUE (cuenta_id)
);

CREATE TABLE detalle
(
    detalle_id SERIAL NOT NULL,
    nombre VARCHAR(60) NOT NULL,
    tipo CHAR NOT NULL,
    PRIMARY KEY (detalle_id),
    UNIQUE (nombre)
);

CREATE TABLE sede
(
    sede_id SMALLSERIAL NOT NULL,
    codigo VARCHAR(40) NOT NULL,
    NIT VARCHAR(20) NOT NULL,
    direccion VARCHAR(60) NOT NULL,
    telefono BIGINT NOT NULL,
    control_manual BOOLEAN NOT NULL DEFAULT FALSE,
    abierto BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (sede_id),
    UNIQUE (direccion),
    UNIQUE (telefono)
);

CREATE TABLE horario
(
    sede_id SMALLINT NOT NULL,
    dia VARCHAR(9) NOT NULL,
    abre TIME NOT NULL DEFAULT '08:00:00',
    cierra TIME NOT NULL DEFAULT '16:00:00',
    PRIMARY KEY (sede_id, dia),
	FOREIGN KEY (sede_id) REFERENCES sede(sede_id)
        ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE cliente
(
    cliente_id VARCHAR(25) NOT NULL,
    nombre VARCHAR(60) NOT NULL,
    apellido VARCHAR(60) NOT NULL,
    id_tipo_id CHAR NOT NULL,
    telefono BIGINT NOT NULL,
    direccion VARCHAR(60) NOT NULL,
    nacimiento DATE NOT NULL DEFAULT CURRENT_DATE,
    PRIMARY KEY (cliente_id),
	FOREIGN KEY (id_tipo_id) REFERENCES tipo_id(id_tipo_id)
        ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE producto
(
    producto_id SERIAL NOT NULL,
    nombre VARCHAR(60) NOT NULL,
    codigo VARCHAR(30) NOT NULL,
    categoria_id SMALLSERIAL NOT NULL,
    imagen VARCHAR(300) NOT NULL,
    descripcion VARCHAR(300) NOT NULL,
    PRIMARY KEY (producto_id),
    UNIQUE (nombre),
    UNIQUE (imagen),
    UNIQUE (descripcion),
    FOREIGN KEY (categoria_id) REFERENCES categoria(categora_id)
        ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE detalle_producto
(
    producto_id INT NOT NULL,
    detalle_id INT NOT NULL,
    PRIMARY KEY (producto_id, detalle_id),
	FOREIGN KEY (producto_id) REFERENCES producto(producto_id)
        ON UPDATE CASCADE
		ON DELETE CASCADE,
	FOREIGN KEY (detalle_id) REFERENCES detalle(detalle_id)
        ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE descuento_producto
(
    producto_id INT NOT NULL,
    fecha DATE NOT NULL DEFAULT CURRENT_DATE,
    porcentaje SMALLINT NOT NULL DEFAULT 20,
    PRIMARY KEY (producto_id, fecha),
	FOREIGN KEY (producto_id) REFERENCES producto(producto_id)
        ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE iva_producto
(
    producto_id INT NOT NULL,
    fecha DATE NOT NULL DEFAULT CURRENT_DATE,
    porcentaje SMALLINT NOT NULL DEFAULT 19,
    PRIMARY KEY (producto_id, fecha),
	FOREIGN KEY (producto_id) REFERENCES producto(producto_id)
        ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE precio_producto
(
    producto_id INT NOT NULL,
    fecha DATE NOT NULL DEFAULT CURRENT_DATE,
    precio BIGINT NOT NULL,
    PRIMARY KEY (producto_id, fecha),
	FOREIGN KEY (producto_id) REFERENCES producto(producto_id)
        ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE producto_disponibilidad_inicial
(
    producto_id INT NOT NULL,
    tiempo TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    stock_inicial INT NOT NULL,
    PRIMARY KEY (producto_id, tiempo),
	FOREIGN KEY (producto_id) REFERENCES producto(producto_id)
        ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE producto_disponibilidad_final
(
    producto_id INT NOT NULL,
    tiempo TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    stock_final INT NOT NULL,
    PRIMARY KEY (producto_id, tiempo),
	FOREIGN KEY (producto_id) REFERENCES producto(producto_id)
        ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE factura
(
    factura_id SERIAL NOT NULL,
    numero UUID NOT NULL,
    sede_id SMALLINT NOT NULL,
    cliente_id VARCHAR(25) NOT NULL,
    tiempo TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (factura_id),
	FOREIGN KEY (sede_id) REFERENCES sede(sede_id)
        ON UPDATE CASCADE
		ON DELETE CASCADE,
	FOREIGN KEY (cliente_id) REFERENCES cliente(cliente_id)
        ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE factura_producto
(
    factura_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad SMALLINT NOT NULL,
    PRIMARY KEY (factura_id, producto_id),
	FOREIGN KEY (factura_id) REFERENCES factura(factura_id)
        ON UPDATE CASCADE
		ON DELETE CASCADE,
	FOREIGN KEY (producto_id) REFERENCES producto(producto_id)
        ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE venta
(
    usuario_id BIGINT NOT NULL,
    factura_id INT NOT NULL,
    PRIMARY KEY (usuario_id, factura_id),
	FOREIGN KEY (usuario_id) REFERENCES usuario(usuario_id)
        ON UPDATE CASCADE
		ON DELETE CASCADE,
	FOREIGN KEY (factura_id) REFERENCES factura(factura_id)
        ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE efectivo
(
    factura_id INT NOT NULL,
    PRIMARY KEY (factura_id),
	FOREIGN KEY (factura_id) REFERENCES factura(factura_id)
        ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE tarjeta
(
    factura_id INT NOT NULL,
    tarjeta_id VARCHAR(16) NOT NULL,
    aprobacion_id VARCHAR(25) NOT NULL,
    aprobacion_tiempo TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    aprobacion_entidad VARCHAR(50) NOT NULL,
    tipo_tarjeta CHAR NOT NULL,
    PRIMARY KEY (factura_id),
	FOREIGN KEY (factura_id) REFERENCES factura(factura_id)
        ON UPDATE CASCADE
		ON DELETE CASCADE
);