-- Todas las consultas a la base de datos se realizan usando Prisma,
-- sin embargo, se guardan en este documentos algunos queries que
-- servirían para obtener los mismos datos que se obtienen con
-- algunas sentencias de Prisma en este proyecto.

-- Para seleccionar la info de los productos
SELECT s.*, s.precio * (100 - s.porcentaje) * 0.01 AS precio_con_descuento
FROM	(
	SELECT DISTINCT ON(tb1.producto_id) tb1.nombre,
	(disp.dispo - vent.ventas) AS stock,
	(tb3.costo + tb3.valor_agregado) AS precio, tb4.porcentaje
	FROM producto AS tb1
	JOIN precio_producto AS tb2 ON tb1.producto_id = tb2.producto_id
	JOIN precio AS tb3 ON tb2.precio_id = tb3.precio_id
	JOIN (
		SELECT t1.producto_id, SUM(t2.stock) AS dispo
		FROM producto AS t1
		JOIN producto_disponibilidad AS t2
		ON t1.producto_id = t2.producto_id
		GROUP BY (t1.producto_id)
	) AS disp ON tb1.producto_id = disp.producto_id
	JOIN (
		SELECT t1.producto_id, SUM(t2.ventas) AS ventas
		FROM producto AS t1
		JOIN producto_ventas AS t2
		ON t1.producto_id = t2.producto_id
		GROUP BY (t1.producto_id)
	) AS vent ON tb1.producto_id = vent.producto_id
	LEFT JOIN (
		SELECT t1.producto_id, t2.fecha_inicial, t2.fecha_final, t2.porcentaje
		FROM descuento_producto AS t1
		JOIN descuento AS t2 ON t1.descuento_id =  t2.descuento_id
		WHERE (t2.fecha_inicial, t2.fecha_final) OVERLAPS (CURRENT_DATE, CURRENT_DATE + 1)
	) AS tb4 ON tb1.producto_id = tb4.producto_id
	ORDER BY tb1.producto_id, tb3.fecha DESC NULLS LAST,
	tb4.fecha_inicial DESC NULLS LAST
) AS s;

-- Para seleccionar los ingredientes de un producto
SELECT tb1.nombre, tb3.nombre, tb4.nombre FROM producto AS tb1
JOIN detalle_producto AS tb2 ON tb1.producto_id = tb2.producto_id
JOIN detalle AS tb3 ON tb2.detalle_id = tb3.detalle_id
JOIN detalle_tipo AS tb4 ON tb3.detalle_tipo_id = tb4.detalle_tipo_id
WHERE (tb1.nombre = 'Huevos a la cazuela con verduras')
AND (tb4.nombre = 'Ingredientes');

-- Obtener el stock de cada uno de los productos
SELECT DISTINCT ON(tb1.producto_id) tb1.nombre, tb2.stock_final FROM producto AS tb1
JOIN producto_disponibilidad_final AS tb2 ON tb1.producto_id = tb2.producto_id
ORDER BY tb1.producto_id, tb2.tiempo DESC NULLS LAST;

-- Obtener máximo 5 ingredientes que empiezan con la letra 'a'
SELECT tb1.nombre FROM detalle AS tb1
JOIN detalle_tipo AS tb2 ON tb1.detalle_tipo_id = tb2.detalle_tipo_id
WHERE tb2.nombre = 'Ingredientes'
AND tb1.nombre ILIKE 'a%'
FETCH FIRST 5 ROWS ONLY;

-- Ver los datos que llegan desde el frontend
SELECT DISTINCT ON(tb1.producto_id) tb1.nombre AS "productName",
tb1.codigo, tb1.descripcion AS "descripcionProduct", tb1.imagen AS urlimg,
tb3.costo AS "costoProduccion", tb3.valor_agregado AS ganancia, tb4.porcentaje AS descuento,
tb4.fecha_inicial AS "fechaInicial", tb4.fecha_final AS "fechaFinal",
tb5.stock_final AS stock, tb7.porcentaje AS iva
FROM producto AS tb1
JOIN precio_producto AS tb2 ON tb1.producto_id = tb2.producto_id
JOIN precio AS tb3 ON tb2.precio_id = tb3.precio_id
LEFT JOIN (
	SELECT t1.producto_id, t2.fecha_inicial, t2.fecha_final, t2.porcentaje
	FROM descuento_producto AS t1
	JOIN descuento AS t2 ON t1.descuento_id =  t2.descuento_id
	WHERE (t2.fecha_inicial, t2.fecha_final) OVERLAPS (CURRENT_DATE, CURRENT_DATE + 1)
) AS tb4 ON tb1.producto_id = tb4.producto_id
JOIN producto_disponibilidad_final AS tb5 ON tb1.producto_id = tb5.producto_id
LEFT JOIN iva_producto AS tb6 ON tb1.producto_id = tb6.producto_id
LEFT JOIN iva AS tb7 ON tb6.iva_id = tb7.iva_id
ORDER BY tb1.producto_id, tb3.fecha DESC NULLS LAST,
tb4.fecha_inicial DESC NULLS LAST,
tb5.tiempo DESC NULLS LAST,
tb7.fecha DESC NULLS LAST;

-- Ver los datos de los usuarios
SELECT a1.*, a5.nombre AS documento, a2.clave, a4.nombre AS rol FROM usuario AS a1 
JOIN usuario_documento AS a2
ON a1.usuario_id = a2.usuario_id
JOIN usuario_rol AS a3
ON a1.usuario_id = a3.usuario_id
JOIN rol as a4
ON a3.rol_id = a4.rol_id
JOIN documento AS a5
ON a2.documento_id = a5.documento_id;