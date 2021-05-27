-- Todas las consultas a la base de datos se realizan usando Prisma,
-- sin embargo, se guardan en este documentos algunos queries que
-- servirían para obtener los mismos datos que se obtienen con
-- algunas sentencias de Prisma en este proyecto.

-- Para seleccionar la info de los productos
SELECT s.*, s.precio * (100 - s.porcentaje) * 0.01 AS precio_con_descuento
FROM	(
	SELECT DISTINCT ON(tb1.producto_id) tb1.nombre,
	(tb3.costo + tb3.valor_agregado) AS precio, tb4.porcentaje
	FROM producto AS tb1
	JOIN precio_producto AS tb2 ON tb1.producto_id = tb2.producto_id
	JOIN precio AS tb3 ON tb2.precio_id = tb3.precio_id
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