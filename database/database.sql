CREATE EXTENSION "pgcrypto";

CREATE TABLE categoria
(
    categoria_id SMALLSERIAL NOT NULL,
    numero UUID NOT NULL DEFAULT gen_random_uuid(),
    nombre VARCHAR(60) NOT NULL,
    imagen VARCHAR(300) NOT NULL,
    descripcion VARCHAR(150) NOT NULL,
    habilitado BOOLEAN NOT NULL DEFAULT TRUE,
    PRIMARY KEY (categoria_id),
    UNIQUE (nombre),
    UNIQUE (numero),
    UNIQUE (imagen)
);

CREATE TABLE tipo_id
(
    id_tipo_id CHAR NOT NULL,
    nombre VARCHAR(35) NOT NULL,
    PRIMARY KEY (id_tipo_id),
    UNIQUE (nombre)
);

CREATE TABLE detalle_tipo
(
    detalle_tipo_id CHAR NOT NULL,
    nombre VARCHAR(35) NOT NULL,
    PRIMARY KEY (detalle_tipo_id),
    UNIQUE (nombre)
);

CREATE TABLE tipo_tarjeta
(
    tipo_tarjeta_id CHAR NOT NULL,
    nombre VARCHAR(40) NOT NULL,
    PRIMARY KEY (tipo_tarjeta_id),
    UNIQUE (nombre)
);

CREATE TABLE usuario
(
    usuario_id SERIAL NOT NULL,
    cuenta_id VARCHAR(80) NOT NULL,
    correo VARCHAR(200) NOT NULL,
    nombre VARCHAR(200) NOT NULL,
    admin BOOLEAN NOT NULL DEFAULT FALSE,
    habilitado BOOLEAN NOT NULL DEFAULT TRUE,
    PRIMARY KEY (usuario_id),
    UNIQUE (correo),
    UNIQUE (cuenta_id)
);

CREATE TABLE descuento
(
    descuento_id SERIAL NOT NULL,
    fecha_inicial DATE NOT NULL DEFAULT CURRENT_DATE,
    fecha_final DATE NOT NULL DEFAULT CURRENT_DATE + INTEGER '1',
    porcentaje SMALLINT NOT NULL DEFAULT 20,
    PRIMARY KEY (descuento_id),
    UNIQUE (fecha_inicial, fecha_final, porcentaje)
);

CREATE TABLE iva
(
    iva_id SMALLSERIAL NOT NULL,
    fecha DATE NOT NULL DEFAULT CURRENT_DATE,
    porcentaje SMALLINT NOT NULL DEFAULT 19,
    PRIMARY KEY (iva_id),
    UNIQUE (fecha, porcentaje)
);

CREATE TABLE precio
(
    precio_id SERIAL NOT NULL,
    fecha DATE NOT NULL DEFAULT CURRENT_DATE,
    costo INT NOT NULL,
    valor_agregado INT NOT NULL,
    PRIMARY KEY (precio_id),
    UNIQUE (fecha, costo, valor_agregado)
);

CREATE TABLE detalle
(
    detalle_id SERIAL NOT NULL,
    detalle_tipo_id CHAR NOT NULL,
    nombre VARCHAR(60) NOT NULL,
    PRIMARY KEY (detalle_id),
    UNIQUE (nombre),
	FOREIGN KEY (detalle_tipo_id) REFERENCES detalle_tipo(detalle_tipo_id)
        ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE sede
(
    sede_id SMALLSERIAL NOT NULL,
    codigo VARCHAR(40) NOT NULL,
    NIT VARCHAR(20) NOT NULL,
    direccion VARCHAR(60) NOT NULL,
    telefono VARCHAR(16) NOT NULL,
    control_manual BOOLEAN NOT NULL DEFAULT FALSE,
    abierto BOOLEAN NOT NULL DEFAULT FALSE,
    habilitado BOOLEAN NOT NULL DEFAULT TRUE,
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
    cliente_id SERIAL NOT NULL,
    cliente_doc_id VARCHAR(25) NOT NULL,
    nombre VARCHAR(60) NOT NULL,
    apellido VARCHAR(60) NOT NULL,
    id_tipo_id CHAR NOT NULL,
    telefono VARCHAR(16) NOT NULL,
    direccion VARCHAR(60) NOT NULL,
    nacimiento DATE NOT NULL DEFAULT CURRENT_DATE,
    UNIQUE (cliente_doc_id),
    PRIMARY KEY (cliente_id),
	FOREIGN KEY (id_tipo_id) REFERENCES tipo_id(id_tipo_id)
        ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE producto
(
    producto_id SERIAL NOT NULL,
    numero UUID NOT NULL DEFAULT gen_random_uuid(),
    nombre VARCHAR(120) NOT NULL,
    codigo VARCHAR(30) NOT NULL,
    categoria_id SMALLINT NOT NULL,
    imagen VARCHAR(300) NOT NULL,
    descripcion VARCHAR(300) NOT NULL,
    habilitado BOOLEAN NOT NULL DEFAULT TRUE,
    PRIMARY KEY (producto_id),
    UNIQUE (numero),
    UNIQUE (nombre),
    UNIQUE (codigo),
    UNIQUE (imagen),
    UNIQUE (descripcion),
    FOREIGN KEY (categoria_id) REFERENCES categoria(categoria_id)
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
);

CREATE TABLE descuento_producto
(
    producto_id INT NOT NULL,
    descuento_id INT NOT NULL,
    PRIMARY KEY (producto_id, descuento_id),
	FOREIGN KEY (producto_id) REFERENCES producto(producto_id)
        ON UPDATE CASCADE
		ON DELETE CASCADE,
	FOREIGN KEY (descuento_id) REFERENCES descuento(descuento_id)
);

CREATE TABLE iva_producto
(
    producto_id INT NOT NULL,
    iva_id SMALLINT NOT NULL,
    PRIMARY KEY (producto_id, iva_id),
	FOREIGN KEY (producto_id) REFERENCES producto(producto_id)
        ON UPDATE CASCADE
		ON DELETE CASCADE,
	FOREIGN KEY (iva_id) REFERENCES iva(iva_id)
);

CREATE TABLE precio_producto
(
    producto_id INT NOT NULL,
    precio_id INT NOT NULL,
    PRIMARY KEY (producto_id, precio_id),
	FOREIGN KEY (producto_id) REFERENCES producto(producto_id)
        ON UPDATE CASCADE
		ON DELETE CASCADE,
	FOREIGN KEY (precio_id) REFERENCES precio(precio_id)
);

CREATE TABLE producto_ventas
(
    producto_id INT NOT NULL,
    tiempo TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ventas SMALLINT NOT NULL,
    PRIMARY KEY (producto_id, tiempo),
	FOREIGN KEY (producto_id) REFERENCES producto(producto_id)
        ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE producto_disponibilidad
(
    producto_id INT NOT NULL,
    tiempo TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    stock SMALLINT NOT NULL,
    PRIMARY KEY (producto_id, tiempo),
	FOREIGN KEY (producto_id) REFERENCES producto(producto_id)
        ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE factura
(
    factura_id SERIAL NOT NULL,
    numero UUID NOT NULL DEFAULT gen_random_uuid(),
    sede_id SMALLINT NOT NULL,
    cliente_id INT NOT NULL,
    tiempo TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (numero),
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

CREATE TABLE transaccion
(
    usuario_id INT NOT NULL,
    factura_id INT NOT NULL,
    PRIMARY KEY (usuario_id, factura_id),
	FOREIGN KEY (usuario_id) REFERENCES usuario(usuario_id)
        ON UPDATE CASCADE
		ON DELETE CASCADE,
	FOREIGN KEY (factura_id) REFERENCES factura(factura_id)
        ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE pago_efectivo
(
    factura_id INT NOT NULL,
    pago INT NOT NULL,
    PRIMARY KEY (factura_id),
	FOREIGN KEY (factura_id) REFERENCES factura(factura_id)
        ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE pago_tarjeta
(
    factura_id INT NOT NULL,
    tipo_tarjeta_id CHAR NOT NULL,
    tarjeta_id VARCHAR(16) NOT NULL,
    aprobacion_id VARCHAR(25) NOT NULL,
    aprobacion_tiempo TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    aprobacion_entidad VARCHAR(50) NOT NULL,
    pago INT NOT NULL,
    PRIMARY KEY (factura_id, tipo_tarjeta_id),
	FOREIGN KEY (factura_id) REFERENCES factura(factura_id)
        ON UPDATE CASCADE
		ON DELETE CASCADE,
	FOREIGN KEY (tipo_tarjeta_id) REFERENCES tipo_tarjeta(tipo_tarjeta_id)
        ON UPDATE CASCADE
		ON DELETE CASCADE
);