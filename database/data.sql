-- Datos de prueba

INSERT INTO tipo_id VALUES ('1', 'cedula de ciudadanía');
INSERT INTO tipo_id VALUES ('2', 'cedula extranjera');
INSERT INTO tipo_id VALUES ('3', 'numero de identificación personal');
INSERT INTO tipo_id VALUES ('4', 'numero de identificación tributaria');
INSERT INTO tipo_id VALUES ('5', 'tarjeta de identidad');
INSERT INTO tipo_id VALUES ('6', 'pasaporte');

INSERT INTO detalle_tipo VALUES ('1', 'Ingredientes');
INSERT INTO detalle_tipo VALUES ('2', 'Acompañamientos');
INSERT INTO detalle_tipo VALUES ('3', 'Caracteristicas importantes');
INSERT INTO detalle_tipo VALUES ('4', 'Tiempo de preparación');

INSERT INTO categoria VALUES (1, 'Desayunos', 'https://cdn.pixabay.com/photo/2016/03/09/15/30/breakfast-1246686_1280.jpg', 'Alimentos ligeros para la mañana');
INSERT INTO categoria VALUES (2, 'Almuerzos', 'https://cdn.pixabay.com/photo/2014/03/11/17/05/fry-up-285360_1280.jpg', 'Alimentos del medio día');
INSERT INTO categoria VALUES (3, 'Bebidas', 'https://cdn.pixabay.com/photo/2015/09/05/23/59/apple-926456_1280.jpg', 'Lista de bebidas');
INSERT INTO categoria VALUES (4, 'Postres', 'https://cdn.pixabay.com/photo/2016/11/22/18/52/cake-1850011_1280.jpg', 'Alimentos dulces');
INSERT INTO categoria VALUES (5, 'Comida rápida', 'https://cdn.pixabay.com/photo/2016/04/09/09/22/pizza-1317699_1280.jpg', 'Alimentos para consumir rápidamente');

INSERT INTO producto  VALUES (1, 'Huevos a la cazuela con verduras', '00000000001', 1, 'https://www.elmueble.com/medio/2020/07/17/huevos-a-la-cazuela-00520550_ddca8fa3_1200x1600.jpg', 'Desayuno cargado con la proteína saludable del huevo, que además combate la anemia y tiene un gran aporte de vitaminas.');
INSERT INTO producto  VALUES (2, 'Crumble de manzana con maiz', '00000000002', 1, 'https://www.elmueble.com/medio/2020/07/17/crumble-de-manzana-00426667-o_d50c2afb_1200x1485.jpg', 'El crumble de manzana es un postre tradicional inglés que se realiza a base de fruta, harina, mantequilla y azúcar. Sin embargo, podemos disfrutar del crumble de una forma más sana gracias a esta versión con maíz.');
INSERT INTO producto  VALUES (3, 'Tortitas de avena con plátano', '00000000003', 1, 'https://www.elmueble.com/medio/2020/01/14/tortitas-de-avena-con-platano-425564_994cb9d8_1200x1610.jpg', 'A los niños les encantan las tortitas. Además es una receta muy divertida de hacer con ellos, y de prepararles a modo de desayuno. Para que sea un desayuno sano para niños se puede acudir a cereales como la avena, menos azúcar y más fruta.');
INSERT INTO producto  VALUES (4, 'Pollo asado sin grasa', '00000000004', 2, 'https://s1.eestatic.com/2015/06/10/cocinillas/cocinillas_40006005_116187702_1024x576.jpg', 'Pollo cocido en zumo de manzana. Gracias a los azucares naturales que contiene el zumo de manzana se carameliza de una forma increible.');
INSERT INTO producto  VALUES (5, 'Alitas de pollo en salsa picante', '00000000005', 2, 'https://s1.eestatic.com/2015/06/30/cocinillas/cocinillas_45005500_116192574_1706x960.jpg', 'Alitas de pollo marinadas cubiertas con una salsa muy deliciosa.');
INSERT INTO producto  VALUES (6, 'Pollo frito al estilo japonés', '00000000006', 2, 'https://s1.eestatic.com/2019/07/05/cocinillas/recetas/recetas_411470257_127377882_864x486.jpg', 'Ultratierno por dentro, supercrujiente por fuera y lleno de sabor, así es como queda este pollo frito al estilo japonés');
INSERT INTO producto  VALUES (7, 'Zumo de manzana, piña y zanahoria', '00000000007', 3, 'https://sevilla.abc.es/gurme/wp-content/uploads/sites/24/2013/08/zuma-manzana-zanahoria-960x540.jpg', 'Este zumo es antioxidante, gracias al betacaroteno de la zanahoria, depurativo, gracias a la piña y digestivo, gracias a la manzana. Es ideal en ayunas para comenzar el día y como suplemento vitamínico y limpiador del organismo cuando se sigue una dieta de adelgazamiento.');
INSERT INTO producto  VALUES (8, 'Piña colada', '00000000008', 3, 'https://cdn2.cocinadelirante.com/sites/default/files/images/2019/04/receta-facil-de-agua-de-avena-con-pina-y-coco.jpg', 'Este cóctel va a destacar por su alto contenido en vitaminas y minerales, además de sustancias de acción antioxidantes, que nos van a ayudar a reducir el riesgo de contraer enfermedades degenerativas y crónicas. También merece destacar su importante aporte de fibra.');
INSERT INTO producto  VALUES (9, 'Daikiri de plátano', '00000000009', 3, 'https://us.emedemujer.com/wp-content/uploads/sites/3/2018/07/Daiquiri-de-banana.jpg', 'Bebida muy refresacandte, con mucho sabor, espesa y con un alto contenido de alcohol.');
INSERT INTO producto  VALUES (10, 'Tarta de chocolate', '00000000010', 4, 'https://www.cocinacaserayfacil.net/wp-content/uploads/2017/04/tarta-de-chocolate-sin-horno.jpg', 'Tarta sencilla y suave, con un delicioso sabor a chocolate.');
INSERT INTO producto  VALUES (11, 'Tortitas con salteado de ternera', '00000000011', 5, 'https://sevilla.abc.es/gurme/wp-content/uploads/sites/24/2011/10/tortitas-con-salteado-de-ternera-960x540.jpg', 'Divertidas de comer, estas tortitas encandilarán a los más pequeños de la casa.');

INSERT INTO iva VALUES (1, '2020-01-01', 19);

INSERT INTO iva_producto VALUES (1, 1);
INSERT INTO iva_producto VALUES (2, 1);
INSERT INTO iva_producto VALUES (3, 1);
INSERT INTO iva_producto VALUES (4, 1);
INSERT INTO iva_producto VALUES (5, 1);
INSERT INTO iva_producto VALUES (6, 1);
INSERT INTO iva_producto VALUES (7, 1);
INSERT INTO iva_producto VALUES (8, 1);
INSERT INTO iva_producto VALUES (9, 1);
INSERT INTO iva_producto VALUES (10, 1);
INSERT INTO iva_producto VALUES (11, 1);

INSERT INTO precio VALUES (1, '2020-08-24', 10000);
INSERT INTO precio VALUES (2, '2021-01-10', 11000);
INSERT INTO precio VALUES (3, '2020-08-29', 10000);
INSERT INTO precio VALUES (4, '2021-01-10', 8000);
INSERT INTO precio VALUES (5, '2021-01-25', 9000);
INSERT INTO precio VALUES (6, '2021-01-25', 12000);
INSERT INTO precio VALUES (7, '2021-01-01', 18000);
INSERT INTO precio VALUES (8, '2021-01-25', 19000);
INSERT INTO precio VALUES (9, '2021-01-25', 20000);
INSERT INTO precio VALUES (10, '2021-01-25', 6000);
INSERT INTO precio VALUES (11, '2021-01-25', 7000);

INSERT INTO precio_producto VALUES (1, 1);
INSERT INTO precio_producto VALUES (1, 2);
INSERT INTO precio_producto VALUES (2, 3);
INSERT INTO precio_producto VALUES (2, 4);
INSERT INTO precio_producto VALUES (2, 5);
INSERT INTO precio_producto VALUES (3, 1);
INSERT INTO precio_producto VALUES (3, 6);
INSERT INTO precio_producto VALUES (4, 7);
INSERT INTO precio_producto VALUES (4, 8);
INSERT INTO precio_producto VALUES (5, 9);
INSERT INTO precio_producto VALUES (6, 9);
INSERT INTO precio_producto VALUES (7, 10);
INSERT INTO precio_producto VALUES (8, 10);
INSERT INTO precio_producto VALUES (9, 10);
INSERT INTO precio_producto VALUES (10, 10);
INSERT INTO precio_producto VALUES (11, 11);

INSERT INTO descuento VALUES (1, CURRENT_DATE, CURRENT_DATE + 1);
INSERT INTO descuento VALUES (2, '2021-05-16', '2021-05-17', 25);
INSERT INTO descuento VALUES (3, '2021-05-17', '2021-05-18', 20);

INSERT INTO descuento_producto VALUES (1, 1);
INSERT INTO descuento_producto VALUES (2, 2);
INSERT INTO descuento_producto VALUES (3, 3);
INSERT INTO descuento_producto VALUES (4, 1);
INSERT INTO descuento_producto VALUES (5, 2);
INSERT INTO descuento_producto VALUES (6, 3);
INSERT INTO descuento_producto VALUES (7, 1);
INSERT INTO descuento_producto VALUES (8, 2);
INSERT INTO descuento_producto VALUES (9, 3);
INSERT INTO descuento_producto VALUES (10, 1);
INSERT INTO descuento_producto VALUES (11, 2);

INSERT INTO producto_disponibilidad_inicial VALUES (1, '2021-01-01 09:00:00.000000+00', 50);
INSERT INTO producto_disponibilidad_inicial VALUES (2, '2021-01-01 09:00:00.000000+00', 50);
INSERT INTO producto_disponibilidad_inicial VALUES (3, '2021-01-01 09:00:00.000000+00', 20);
INSERT INTO producto_disponibilidad_inicial VALUES (4, '2021-01-01 09:00:00.000000+00', 30);
INSERT INTO producto_disponibilidad_inicial VALUES (5, '2021-01-01 09:00:00.000000+00', 35);
INSERT INTO producto_disponibilidad_inicial VALUES (6, '2021-01-01 09:00:00.000000+00', 30);
INSERT INTO producto_disponibilidad_inicial VALUES (7, '2021-01-01 09:00:00.000000+00', 30);
INSERT INTO producto_disponibilidad_inicial VALUES (8, '2021-01-01 09:00:00.000000+00', 30);
INSERT INTO producto_disponibilidad_inicial VALUES (9, '2021-01-01 09:00:00.000000+00', 30);
INSERT INTO producto_disponibilidad_inicial VALUES (10, '2021-01-01 09:00:00.000000+00', 50);
INSERT INTO producto_disponibilidad_inicial VALUES (11, '2021-01-01 09:00:00.000000+00', 50);

INSERT INTO producto_disponibilidad_final VALUES (1, '2021-01-01 09:00:00.000000+00', 50);
INSERT INTO producto_disponibilidad_final VALUES (1, '2021-01-01 09:25:00.000000+00', 49);
INSERT INTO producto_disponibilidad_final VALUES (1, '2021-01-01 09:35:00.000000+00', 48);
INSERT INTO producto_disponibilidad_final VALUES (2, '2021-01-03 09:00:00.000000+00', 50);
INSERT INTO producto_disponibilidad_final VALUES (2, '2021-01-04 09:25:00.000000+00', 49);
INSERT INTO producto_disponibilidad_final VALUES (2, '2021-01-05 09:35:00.000000+00', 48);
INSERT INTO producto_disponibilidad_final VALUES (3, '2021-01-04 09:00:00.000000+00', 20);
INSERT INTO producto_disponibilidad_final VALUES (3, '2021-01-05 09:00:00.000000+00', 15);
INSERT INTO producto_disponibilidad_final VALUES (4, '2021-01-01 09:00:00.000000+00', 30);
INSERT INTO producto_disponibilidad_final VALUES (4, '2021-01-03 09:00:00.000000+00', 29);
INSERT INTO producto_disponibilidad_final VALUES (5, '2021-01-03 09:00:00.000000+00', 35);
INSERT INTO producto_disponibilidad_final VALUES (6, '2021-01-03 09:00:00.000000+00', 30);
INSERT INTO producto_disponibilidad_final VALUES (7, '2021-01-03 09:00:00.000000+00', 30);
INSERT INTO producto_disponibilidad_final VALUES (8, '2021-01-03 09:00:00.000000+00', 30);
INSERT INTO producto_disponibilidad_final VALUES (9, '2021-01-03 09:00:00.000000+00', 30);
INSERT INTO producto_disponibilidad_final VALUES (9, '2021-01-04 09:00:00.000000+00', 29);
INSERT INTO producto_disponibilidad_final VALUES (10, '2021-01-04 09:00:00.000000+00', 50);
INSERT INTO producto_disponibilidad_final VALUES (10, '2021-01-05 09:00:00.000000+00', 49);
INSERT INTO producto_disponibilidad_final VALUES (11, '2021-01-05 09:00:00.000000+00', 50);

-- Detalles del producto 1
INSERT INTO detalle VALUES (1, '1', 'setas variadas');
INSERT INTO detalle VALUES (2, '1', 'cebolleta');
INSERT INTO detalle VALUES (3, '1', 'espárragos');
INSERT INTO detalle VALUES (4, '1', 'huevos');
INSERT INTO detalle VALUES (5, '1', 'nata líquida');
INSERT INTO detalle VALUES (6, '1', 'queso cheddar');
INSERT INTO detalle VALUES (7, '1', 'queso curado rallado');
INSERT INTO detalle VALUES (8, '1', 'tomillo');
INSERT INTO detalle VALUES (9, '1', 'mantequilla');
INSERT INTO detalle VALUES (10, '1', 'sal');
INSERT INTO detalle VALUES (11, '1', 'pimienta');

INSERT INTO detalle VALUES (12, '2', '2 tajadas de pan tostado');

INSERT INTO detalle VALUES (13, '3', 'Alimento saludable');
INSERT INTO detalle VALUES (14, '3', 'Muy nutritivo');
INSERT INTO detalle VALUES (15, '3', 'Alta concentración de proteínas');

INSERT INTO detalle VALUES (16, '4', '40 minutos');

-- Detalles del producto 2
INSERT INTO detalle VALUES (17, '1', 'manzanas');
INSERT INTO detalle VALUES (18, '1', 'harina de maiz');
INSERT INTO detalle VALUES (19, '1', 'aceite de girasol');
INSERT INTO detalle VALUES (20, '1', 'azúcar integral de caña');
INSERT INTO detalle VALUES (21, '1', 'avena');
INSERT INTO detalle VALUES (22, '1', 'uvas pasas');
INSERT INTO detalle VALUES (23, '1', 'limon');
INSERT INTO detalle VALUES (24, '1', 'vainilla');
INSERT INTO detalle VALUES (25, '1', 'canela en polvo');
INSERT INTO detalle VALUES (26, '1', 'sal marina');

INSERT INTO detalle VALUES (27, '4', '35 minutos');

-- Detalles del producto 3
INSERT INTO detalle VALUES (28, '1', 'harina de avena');
INSERT INTO detalle VALUES (29, '1', 'fresas');
INSERT INTO detalle VALUES (30, '1', 'leche vegetal');
INSERT INTO detalle VALUES (31, '1', 'miel');
INSERT INTO detalle VALUES (32, '1', 'levadura');
INSERT INTO detalle VALUES (33, '1', 'azucar moreno');
INSERT INTO detalle VALUES (34, '1', 'canela');
INSERT INTO detalle VALUES (35, '1', 'plátano');
INSERT INTO detalle VALUES (36, '1', 'esencia de vainilla');

-- Detalles del producto 4
INSERT INTO detalle VALUES (37, '1', 'pollo, 4 cuartos traseros');
INSERT INTO detalle VALUES (38, '1', 'zumo de manzana');

INSERT INTO detalle VALUES (39, '2', '3 papas pardas');

INSERT INTO detalle VALUES (40, '3', 'Libre de grasa');

-- Detalles del producto 5
INSERT INTO detalle VALUES (41, '1', 'alitas de pollo, 10');
INSERT INTO detalle VALUES (42, '1', 'vino blanco');
INSERT INTO detalle VALUES (43, '1', 'brandy');
INSERT INTO detalle VALUES (44, '1', 'aceite de oliva virgen');
INSERT INTO detalle VALUES (45, '1', 'mostaza');
INSERT INTO detalle VALUES (46, '1', 'salsa barbacoa');
INSERT INTO detalle VALUES (47, '1', 'tabasco');

INSERT INTO detalle VALUES (48, '2', 'papas fritas');

INSERT INTO detalle VALUES (49, '3', 'Picante');
INSERT INTO detalle VALUES (50, '3', 'Cubierto en salsa');

INSERT INTO detalle VALUES (51, '4', '25 minutos');

-- Detalles del producto 6
INSERT INTO detalle VALUES (52, '1', 'cuartos traseros de pollo, 2');
INSERT INTO detalle VALUES (53, '1', 'salsa de soja');
INSERT INTO detalle VALUES (54, '1', 'Ajo en polvo');
INSERT INTO detalle VALUES (55, '1', 'Jengibre en polvo');
INSERT INTO detalle VALUES (56, '1', 'Maizena');

INSERT INTO detalle VALUES (57, '3', 'frito');
INSERT INTO detalle VALUES (58, '3', 'super crujiente');
INSERT INTO detalle VALUES (59, '3', 'ligero');

-- Detalles del producto 7
INSERT INTO detalle VALUES (60, '1', 'manzana verde');
INSERT INTO detalle VALUES (61, '1', 'piña natural');
INSERT INTO detalle VALUES (62, '1', 'zanahoria');

INSERT INTO detalle VALUES (63, '3', 'antioxidante');

INSERT INTO detalle VALUES (64, '4', '6 minutos');

-- Detalles del producto 8
INSERT INTO detalle VALUES (65, '1', 'leche de coco');

-- Detalles del producto 9
INSERT INTO detalle VALUES (66, '1', 'ron blanco');
INSERT INTO detalle VALUES (67, '1', 'licor de banano');
INSERT INTO detalle VALUES (68, '1', 'banano');

INSERT INTO detalle VALUES (69, '3', 'bebida alcoholica');
INSERT INTO detalle VALUES (70, '3', 'refrescante');
INSERT INTO detalle VALUES (71, '3', 'mucho sabor');

-- Detalles del producto 10
INSERT INTO detalle VALUES (72, '1', 'galletas maría');
INSERT INTO detalle VALUES (73, '1', 'leche');
INSERT INTO detalle VALUES (74, '1', 'nata para montar');
INSERT INTO detalle VALUES (75, '1', 'chocolate');
INSERT INTO detalle VALUES (76, '1', 'gelatina neutra');

INSERT INTO detalle VALUES (77, '3', 'cremoso');

-- Detalles del producto 11
INSERT INTO detalle VALUES (78, '1', 'tortitas de maiz');
INSERT INTO detalle VALUES (79, '1', 'cebolla');
INSERT INTO detalle VALUES (80, '1', 'carne de ternera picada');
INSERT INTO detalle VALUES (81, '1', 'champiñones laminados');
INSERT INTO detalle VALUES (82, '1', 'piminetos rojos');
INSERT INTO detalle VALUES (83, '1', 'tomate');
INSERT INTO detalle VALUES (84, '1', 'aceite de oliva');

-- Inserción de detalles a los productos
INSERT INTO detalle_producto VALUES (1, 1);
INSERT INTO detalle_producto VALUES (1, 2);
INSERT INTO detalle_producto VALUES (1, 3);
INSERT INTO detalle_producto VALUES (1, 4);
INSERT INTO detalle_producto VALUES (1, 5);
INSERT INTO detalle_producto VALUES (1, 6);
INSERT INTO detalle_producto VALUES (1, 7);
INSERT INTO detalle_producto VALUES (1, 8);
INSERT INTO detalle_producto VALUES (1, 9);
INSERT INTO detalle_producto VALUES (1, 10);
INSERT INTO detalle_producto VALUES (1, 11);
INSERT INTO detalle_producto VALUES (1, 12);
INSERT INTO detalle_producto VALUES (1, 13);
INSERT INTO detalle_producto VALUES (1, 14);
INSERT INTO detalle_producto VALUES (1, 15);
INSERT INTO detalle_producto VALUES (1, 16);

INSERT INTO detalle_producto VALUES (2, 17);
INSERT INTO detalle_producto VALUES (2, 18);
INSERT INTO detalle_producto VALUES (2, 19);
INSERT INTO detalle_producto VALUES (2, 20);
INSERT INTO detalle_producto VALUES (2, 21);
INSERT INTO detalle_producto VALUES (2, 22);
INSERT INTO detalle_producto VALUES (2, 23);
INSERT INTO detalle_producto VALUES (2, 24);
INSERT INTO detalle_producto VALUES (2, 25);
INSERT INTO detalle_producto VALUES (2, 26);
INSERT INTO detalle_producto VALUES (2, 27);
INSERT INTO detalle_producto VALUES (2, 13);
INSERT INTO detalle_producto VALUES (2, 14);
INSERT INTO detalle_producto VALUES (2, 15);

INSERT INTO detalle_producto VALUES (3, 27);
INSERT INTO detalle_producto VALUES (3, 28);
INSERT INTO detalle_producto VALUES (3, 29);
INSERT INTO detalle_producto VALUES (3, 30);
INSERT INTO detalle_producto VALUES (3, 31);
INSERT INTO detalle_producto VALUES (3, 32);
INSERT INTO detalle_producto VALUES (3, 33);
INSERT INTO detalle_producto VALUES (3, 34);
INSERT INTO detalle_producto VALUES (3, 35);
INSERT INTO detalle_producto VALUES (3, 36);
INSERT INTO detalle_producto VALUES (3, 4);
INSERT INTO detalle_producto VALUES (3, 9);
INSERT INTO detalle_producto VALUES (3, 10);
INSERT INTO detalle_producto VALUES (3, 13);
INSERT INTO detalle_producto VALUES (3, 14);
INSERT INTO detalle_producto VALUES (3, 15);

INSERT INTO detalle_producto VALUES (4, 27);
INSERT INTO detalle_producto VALUES (4, 37);
INSERT INTO detalle_producto VALUES (4, 38);
INSERT INTO detalle_producto VALUES (4, 39);
INSERT INTO detalle_producto VALUES (4, 40);
INSERT INTO detalle_producto VALUES (4, 10);
INSERT INTO detalle_producto VALUES (4, 11);
INSERT INTO detalle_producto VALUES (4, 13);
INSERT INTO detalle_producto VALUES (4, 14);
INSERT INTO detalle_producto VALUES (4, 15);

INSERT INTO detalle_producto VALUES (5, 41);
INSERT INTO detalle_producto VALUES (5, 42);
INSERT INTO detalle_producto VALUES (5, 43);
INSERT INTO detalle_producto VALUES (5, 44);
INSERT INTO detalle_producto VALUES (5, 45);
INSERT INTO detalle_producto VALUES (5, 46);
INSERT INTO detalle_producto VALUES (5, 47);
INSERT INTO detalle_producto VALUES (5, 10);
INSERT INTO detalle_producto VALUES (5, 48);
INSERT INTO detalle_producto VALUES (5, 49);
INSERT INTO detalle_producto VALUES (5, 50);
INSERT INTO detalle_producto VALUES (5, 51);

INSERT INTO detalle_producto VALUES (6, 52);
INSERT INTO detalle_producto VALUES (6, 53);
INSERT INTO detalle_producto VALUES (6, 54);
INSERT INTO detalle_producto VALUES (6, 55);
INSERT INTO detalle_producto VALUES (6, 56);
INSERT INTO detalle_producto VALUES (6, 19);
INSERT INTO detalle_producto VALUES (6, 42);
INSERT INTO detalle_producto VALUES (6, 10);
INSERT INTO detalle_producto VALUES (6, 11);
INSERT INTO detalle_producto VALUES (6, 48);
INSERT INTO detalle_producto VALUES (6, 57);
INSERT INTO detalle_producto VALUES (6, 58);
INSERT INTO detalle_producto VALUES (6, 59);
INSERT INTO detalle_producto VALUES (6, 51);

INSERT INTO detalle_producto VALUES (7, 60);
INSERT INTO detalle_producto VALUES (7, 61);
INSERT INTO detalle_producto VALUES (7, 62);
INSERT INTO detalle_producto VALUES (7, 23);
INSERT INTO detalle_producto VALUES (7, 63);
INSERT INTO detalle_producto VALUES (7, 13);
INSERT INTO detalle_producto VALUES (7, 14);
INSERT INTO detalle_producto VALUES (7, 64);

INSERT INTO detalle_producto VALUES (8, 65);
INSERT INTO detalle_producto VALUES (8, 21);
INSERT INTO detalle_producto VALUES (8, 61);
INSERT INTO detalle_producto VALUES (8, 63);
INSERT INTO detalle_producto VALUES (8, 13);
INSERT INTO detalle_producto VALUES (8, 14);
INSERT INTO detalle_producto VALUES (8, 64);

INSERT INTO detalle_producto VALUES (9, 66);
INSERT INTO detalle_producto VALUES (9, 67);
INSERT INTO detalle_producto VALUES (9, 68);
INSERT INTO detalle_producto VALUES (9, 69);
INSERT INTO detalle_producto VALUES (9, 70);
INSERT INTO detalle_producto VALUES (9, 71);
INSERT INTO detalle_producto VALUES (9, 64);

INSERT INTO detalle_producto VALUES (10, 72);
INSERT INTO detalle_producto VALUES (10, 73);
INSERT INTO detalle_producto VALUES (10, 74);
INSERT INTO detalle_producto VALUES (10, 75);
INSERT INTO detalle_producto VALUES (10, 76);
INSERT INTO detalle_producto VALUES (10, 9);
INSERT INTO detalle_producto VALUES (10, 59);
INSERT INTO detalle_producto VALUES (10, 71);
INSERT INTO detalle_producto VALUES (10, 77);
INSERT INTO detalle_producto VALUES (10, 64);

INSERT INTO detalle_producto VALUES (11, 78);
INSERT INTO detalle_producto VALUES (11, 79);
INSERT INTO detalle_producto VALUES (11, 80);
INSERT INTO detalle_producto VALUES (11, 81);
INSERT INTO detalle_producto VALUES (11, 82);
INSERT INTO detalle_producto VALUES (11, 83);
INSERT INTO detalle_producto VALUES (11, 84);
INSERT INTO detalle_producto VALUES (11, 10);
INSERT INTO detalle_producto VALUES (11, 11);
INSERT INTO detalle_producto VALUES (11, 71);
INSERT INTO detalle_producto VALUES (11, 59);
INSERT INTO detalle_producto VALUES (11, 15);
INSERT INTO detalle_producto VALUES (11, 64);
