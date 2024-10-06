--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4 (Postgres.app)
-- Dumped by pg_dump version 16.4 (Postgres.app)

-- Started on 2024-10-06 17:15:05 -05

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE "Portafolio";
--
-- TOC entry 3676 (class 1262 OID 16563)
-- Name: Portafolio; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "Portafolio" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';


ALTER DATABASE "Portafolio" OWNER TO postgres;

\connect "Portafolio"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3677 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16699)
-- Name: clientes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clientes (
    id_cliente integer NOT NULL,
    nombre character varying(30) NOT NULL,
    apellido character varying(30) NOT NULL,
    email character varying(50),
    telefono character varying(10) NOT NULL,
    empresa character varying(100) NOT NULL,
    cargo character varying(30)
);


ALTER TABLE public.clientes OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16698)
-- Name: clientes_id_cliente_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.clientes_id_cliente_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.clientes_id_cliente_seq OWNER TO postgres;

--
-- TOC entry 3678 (class 0 OID 0)
-- Dependencies: 217
-- Name: clientes_id_cliente_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.clientes_id_cliente_seq OWNED BY public.clientes.id_cliente;


--
-- TOC entry 220 (class 1259 OID 16706)
-- Name: consultas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.consultas (
    id_consulta integer NOT NULL,
    cliente_id integer,
    servicio character varying(200),
    consulta text,
    fecha_envio timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.consultas OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16705)
-- Name: consultas_id_consulta_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.consultas_id_consulta_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.consultas_id_consulta_seq OWNER TO postgres;

--
-- TOC entry 3679 (class 0 OID 0)
-- Dependencies: 219
-- Name: consultas_id_consulta_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.consultas_id_consulta_seq OWNED BY public.consultas.id_consulta;


--
-- TOC entry 224 (class 1259 OID 16751)
-- Name: oferta_de_servicios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.oferta_de_servicios (
    id integer NOT NULL,
    nombre_del_servicio character varying(50),
    descripcion character varying(100)
);


ALTER TABLE public.oferta_de_servicios OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16750)
-- Name: oferta_de_servicios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.oferta_de_servicios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.oferta_de_servicios_id_seq OWNER TO postgres;

--
-- TOC entry 3680 (class 0 OID 0)
-- Dependencies: 223
-- Name: oferta_de_servicios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.oferta_de_servicios_id_seq OWNED BY public.oferta_de_servicios.id;


--
-- TOC entry 222 (class 1259 OID 16736)
-- Name: respuestas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.respuestas (
    id_respuesta integer NOT NULL,
    consulta_id integer,
    respuesta text,
    fecha_respuesta timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.respuestas OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16735)
-- Name: respuestas_id_respuesta_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.respuestas_id_respuesta_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.respuestas_id_respuesta_seq OWNER TO postgres;

--
-- TOC entry 3681 (class 0 OID 0)
-- Dependencies: 221
-- Name: respuestas_id_respuesta_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.respuestas_id_respuesta_seq OWNED BY public.respuestas.id_respuesta;


--
-- TOC entry 226 (class 1259 OID 16758)
-- Name: servicios_seleccionados; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.servicios_seleccionados (
    id integer NOT NULL,
    cliente_id integer,
    servicio_id integer,
    fecha_seleccion timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.servicios_seleccionados OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16757)
-- Name: servicios_seleccionados_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.servicios_seleccionados_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.servicios_seleccionados_id_seq OWNER TO postgres;

--
-- TOC entry 3682 (class 0 OID 0)
-- Dependencies: 225
-- Name: servicios_seleccionados_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.servicios_seleccionados_id_seq OWNED BY public.servicios_seleccionados.id;


--
-- TOC entry 216 (class 1259 OID 16607)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id_usuario integer NOT NULL,
    nombre_usuario character varying(50),
    email character varying(50),
    password character varying(50),
    rol character varying(10)
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16606)
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_usuario_seq OWNER TO postgres;

--
-- TOC entry 3683 (class 0 OID 0)
-- Dependencies: 215
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_usuario_seq OWNED BY public.usuarios.id_usuario;


--
-- TOC entry 3491 (class 2604 OID 16702)
-- Name: clientes id_cliente; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes ALTER COLUMN id_cliente SET DEFAULT nextval('public.clientes_id_cliente_seq'::regclass);


--
-- TOC entry 3492 (class 2604 OID 16709)
-- Name: consultas id_consulta; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consultas ALTER COLUMN id_consulta SET DEFAULT nextval('public.consultas_id_consulta_seq'::regclass);


--
-- TOC entry 3496 (class 2604 OID 16754)
-- Name: oferta_de_servicios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.oferta_de_servicios ALTER COLUMN id SET DEFAULT nextval('public.oferta_de_servicios_id_seq'::regclass);


--
-- TOC entry 3494 (class 2604 OID 16739)
-- Name: respuestas id_respuesta; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.respuestas ALTER COLUMN id_respuesta SET DEFAULT nextval('public.respuestas_id_respuesta_seq'::regclass);


--
-- TOC entry 3497 (class 2604 OID 16761)
-- Name: servicios_seleccionados id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servicios_seleccionados ALTER COLUMN id SET DEFAULT nextval('public.servicios_seleccionados_id_seq'::regclass);


--
-- TOC entry 3490 (class 2604 OID 16610)
-- Name: usuarios id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuarios_id_usuario_seq'::regclass);


--
-- TOC entry 3662 (class 0 OID 16699)
-- Dependencies: 218
-- Data for Name: clientes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.clientes VALUES (1, 'Fabian', 'Fernandez', 'fabianfernandezg@outlook.com', '3505025745', 'Akita Studio', 'Gerente');
INSERT INTO public.clientes VALUES (2, 'ruby', 'gonzalez', 'fruna@hotmail.com', '3134382629', 'hogar', 'encargada');
INSERT INTO public.clientes VALUES (3, 'violeta', 'amarilla', 'amarillo@hotmail.com', '3506012345', 'flores frescas', 'gernete');
INSERT INTO public.clientes VALUES (4, 'violeta', 'roja', 'amarillo@hotmail.com', '3506012345', 'flores pichas', 'gernete');
INSERT INTO public.clientes VALUES (5, 'ruby', 'roja', 'amarillo@hotmail.com', '3245678970', 'hogar', 'encargada');
INSERT INTO public.clientes VALUES (6, 'violeta', 'cafe', 'amarillo@hotmail.com', '3103456785', 'flores hermosas', 'Jefe');
INSERT INTO public.clientes VALUES (7, 'perro', 'Doe', 'johndoe@example.com', '123456789', 'Tech Corp', 'Desarrollador');
INSERT INTO public.clientes VALUES (8, 'Paola', 'Arbelaez', 'paola@hotmail.com', '3456789765', 'flores hermosas', 'Jefe');


--
-- TOC entry 3664 (class 0 OID 16706)
-- Dependencies: 220
-- Data for Name: consultas; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.consultas VALUES (1, 1, 'Frontend Development', 'Quisiera crear un portafolio personal en el que pueda incluir todos los elementos aprendidos', '2024-10-01 23:54:16.243282');
INSERT INTO public.consultas VALUES (2, 2, 'Frontend Development', 'quiero una pagina', '2024-10-02 10:29:38.455615');
INSERT INTO public.consultas VALUES (3, 3, 'Mobile App Development', 'necesito mi pagina web', '2024-10-03 12:14:33.208914');
INSERT INTO public.consultas VALUES (4, 4, 'Mantenimiento y Soporte Web', 'necesito mantenimiento', '2024-10-03 12:31:10.151125');
INSERT INTO public.consultas VALUES (5, 5, 'Mantenimiento y Soporte Web', 'pagina web', '2024-10-03 13:59:40.622278');
INSERT INTO public.consultas VALUES (6, NULL, 'desarrollador web', 'quiero una cotizacion', '2024-10-03 23:49:14.861226');
INSERT INTO public.consultas VALUES (7, 6, 'Frontend Development', 'quiero un front', '2024-10-04 18:22:45.713816');
INSERT INTO public.consultas VALUES (8, 7, 'Mobile App Development', 'Quiero desarrollar una app móvil', '2024-10-05 12:15:25.351252');
INSERT INTO public.consultas VALUES (9, 8, 'Integración de API', 'Necesito una integracion', '2024-10-05 12:29:15.777384');


--
-- TOC entry 3668 (class 0 OID 16751)
-- Dependencies: 224
-- Data for Name: oferta_de_servicios; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3666 (class 0 OID 16736)
-- Dependencies: 222
-- Data for Name: respuestas; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3670 (class 0 OID 16758)
-- Dependencies: 226
-- Data for Name: servicios_seleccionados; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3660 (class 0 OID 16607)
-- Dependencies: 216
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.usuarios VALUES (1, 'Fabian Fernandez', NULL, '12345', NULL);
INSERT INTO public.usuarios VALUES (2, NULL, 'ruby@hotmail.com', '12345', NULL);
INSERT INTO public.usuarios VALUES (3, NULL, 'ruby@hotmail.com', '12345', NULL);
INSERT INTO public.usuarios VALUES (4, NULL, 'kathe@hotmail.com', '12345', NULL);
INSERT INTO public.usuarios VALUES (5, NULL, 'kathe@hotmail.com', '12345', NULL);
INSERT INTO public.usuarios VALUES (6, 'ivan', 'ivan@hotmail.com', '12345', NULL);
INSERT INTO public.usuarios VALUES (7, 'pedro marmol', 'pedro@hotmail.com', '12345', NULL);
INSERT INTO public.usuarios VALUES (8, 'carlos', 'carlos@hotmail.com', '12345', NULL);
INSERT INTO public.usuarios VALUES (9, 'fruna', 'fruna@hotmail.com', '12345', NULL);
INSERT INTO public.usuarios VALUES (10, 'frunamaria', 'amarillo@hotmail.com', '12345', NULL);


--
-- TOC entry 3684 (class 0 OID 0)
-- Dependencies: 217
-- Name: clientes_id_cliente_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clientes_id_cliente_seq', 8, true);


--
-- TOC entry 3685 (class 0 OID 0)
-- Dependencies: 219
-- Name: consultas_id_consulta_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.consultas_id_consulta_seq', 9, true);


--
-- TOC entry 3686 (class 0 OID 0)
-- Dependencies: 223
-- Name: oferta_de_servicios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.oferta_de_servicios_id_seq', 1, false);


--
-- TOC entry 3687 (class 0 OID 0)
-- Dependencies: 221
-- Name: respuestas_id_respuesta_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.respuestas_id_respuesta_seq', 1, false);


--
-- TOC entry 3688 (class 0 OID 0)
-- Dependencies: 225
-- Name: servicios_seleccionados_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.servicios_seleccionados_id_seq', 1, false);


--
-- TOC entry 3689 (class 0 OID 0)
-- Dependencies: 215
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_usuario_seq', 10, true);


--
-- TOC entry 3502 (class 2606 OID 16704)
-- Name: clientes clientes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_pkey PRIMARY KEY (id_cliente);


--
-- TOC entry 3504 (class 2606 OID 16714)
-- Name: consultas consultas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consultas
    ADD CONSTRAINT consultas_pkey PRIMARY KEY (id_consulta);


--
-- TOC entry 3508 (class 2606 OID 16756)
-- Name: oferta_de_servicios oferta_de_servicios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.oferta_de_servicios
    ADD CONSTRAINT oferta_de_servicios_pkey PRIMARY KEY (id);


--
-- TOC entry 3506 (class 2606 OID 16744)
-- Name: respuestas respuestas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.respuestas
    ADD CONSTRAINT respuestas_pkey PRIMARY KEY (id_respuesta);


--
-- TOC entry 3510 (class 2606 OID 16764)
-- Name: servicios_seleccionados servicios_seleccionados_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servicios_seleccionados
    ADD CONSTRAINT servicios_seleccionados_pkey PRIMARY KEY (id);


--
-- TOC entry 3500 (class 2606 OID 16612)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario);


--
-- TOC entry 3511 (class 2606 OID 16715)
-- Name: consultas consultas_cliente_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consultas
    ADD CONSTRAINT consultas_cliente_id_fkey FOREIGN KEY (cliente_id) REFERENCES public.clientes(id_cliente);


--
-- TOC entry 3512 (class 2606 OID 16875)
-- Name: consultas fk_cliente; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consultas
    ADD CONSTRAINT fk_cliente FOREIGN KEY (cliente_id) REFERENCES public.clientes(id_cliente);


--
-- TOC entry 3513 (class 2606 OID 16745)
-- Name: respuestas respuestas_consulta_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.respuestas
    ADD CONSTRAINT respuestas_consulta_id_fkey FOREIGN KEY (consulta_id) REFERENCES public.consultas(id_consulta);


--
-- TOC entry 3514 (class 2606 OID 16765)
-- Name: servicios_seleccionados servicios_seleccionados_cliente_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servicios_seleccionados
    ADD CONSTRAINT servicios_seleccionados_cliente_id_fkey FOREIGN KEY (cliente_id) REFERENCES public.clientes(id_cliente);


--
-- TOC entry 3515 (class 2606 OID 16770)
-- Name: servicios_seleccionados servicios_seleccionados_servicio_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servicios_seleccionados
    ADD CONSTRAINT servicios_seleccionados_servicio_id_fkey FOREIGN KEY (servicio_id) REFERENCES public.oferta_de_servicios(id);


-- Completed on 2024-10-06 17:15:07 -05

--
-- PostgreSQL database dump complete
--

