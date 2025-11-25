--
-- PostgreSQL database dump
--

\restrict Fd0l1LurDWe1ipuTIxfWJRkbWQfspTKvHnJKb569zhjDIGhIXUb5YO4A6VtRgiv

-- Dumped from database version 18.0 (Debian 18.0-1.pgdg13+3)
-- Dumped by pg_dump version 18.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: kysely_migration; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.kysely_migration (
    name character varying(255) NOT NULL,
    "timestamp" character varying(255) NOT NULL
);


ALTER TABLE public.kysely_migration OWNER TO postgres;

--
-- Name: kysely_migration_lock; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.kysely_migration_lock (
    id character varying(255) NOT NULL,
    is_locked integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.kysely_migration_lock OWNER TO postgres;

--
-- Name: tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tag (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.tag OWNER TO postgres;

--
-- Name: todo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.todo (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    description text,
    done boolean NOT NULL,
    deadline date NOT NULL,
    created date NOT NULL,
    completed date
);


ALTER TABLE public.todo OWNER TO postgres;

--
-- Name: todo_tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.todo_tag (
    todo_id uuid NOT NULL,
    tag_id uuid NOT NULL
);


ALTER TABLE public.todo_tag OWNER TO postgres;

--
-- Data for Name: kysely_migration; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.kysely_migration (name, "timestamp") FROM stdin;
1762478961786_first	2025-11-07T01:49:53.103Z
1762480311182_second	2025-11-07T02:01:30.426Z
1762523390414_third	2025-11-07T14:00:59.660Z
1762544653295_fourth	2025-11-07T19:47:06.637Z
\.


--
-- Data for Name: kysely_migration_lock; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.kysely_migration_lock (id, is_locked) FROM stdin;
migration_lock	0
\.


--
-- Data for Name: tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tag (id, name) FROM stdin;
37ae6ce0-370c-4f32-9187-345d9b4e0226	tag1
72695814-8bc4-4ed7-9f79-6de592a0a99f	tag2
ebe1e63d-4f8b-4bfe-92b2-3d7960f09169	tag3
8bc6b7f4-871f-443c-a9e4-6291b899aeff	tag4
06d14c52-a1b5-4d4c-b366-4b3d8b79ffa8	tag5
7139e033-5c97-4bac-9339-e94e4d2e2e87	tag6
fb4093e3-9778-445a-82eb-7a85148f1333	tag7
\.


--
-- Data for Name: todo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.todo (id, title, description, done, deadline, created, completed) FROM stdin;
43813af0-6366-4be7-b8c7-d8598d6f3c6f	some title	some desc	f	2025-11-07	2025-11-07	\N
5d3d2a8f-23d0-4b49-8d11-4928042b4862	some title	some desc	f	2025-11-07	2025-11-08	\N
8aef43a2-ff9a-4a80-bf29-5783e45da336	even even newer title	some desc	f	2025-11-07	2025-11-07	\N
\.


--
-- Data for Name: todo_tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.todo_tag (todo_id, tag_id) FROM stdin;
43813af0-6366-4be7-b8c7-d8598d6f3c6f	37ae6ce0-370c-4f32-9187-345d9b4e0226
43813af0-6366-4be7-b8c7-d8598d6f3c6f	72695814-8bc4-4ed7-9f79-6de592a0a99f
43813af0-6366-4be7-b8c7-d8598d6f3c6f	ebe1e63d-4f8b-4bfe-92b2-3d7960f09169
43813af0-6366-4be7-b8c7-d8598d6f3c6f	8bc6b7f4-871f-443c-a9e4-6291b899aeff
5d3d2a8f-23d0-4b49-8d11-4928042b4862	37ae6ce0-370c-4f32-9187-345d9b4e0226
5d3d2a8f-23d0-4b49-8d11-4928042b4862	72695814-8bc4-4ed7-9f79-6de592a0a99f
5d3d2a8f-23d0-4b49-8d11-4928042b4862	ebe1e63d-4f8b-4bfe-92b2-3d7960f09169
5d3d2a8f-23d0-4b49-8d11-4928042b4862	8bc6b7f4-871f-443c-a9e4-6291b899aeff
8aef43a2-ff9a-4a80-bf29-5783e45da336	37ae6ce0-370c-4f32-9187-345d9b4e0226
8aef43a2-ff9a-4a80-bf29-5783e45da336	72695814-8bc4-4ed7-9f79-6de592a0a99f
8aef43a2-ff9a-4a80-bf29-5783e45da336	fb4093e3-9778-445a-82eb-7a85148f1333
\.


--
-- Name: kysely_migration_lock kysely_migration_lock_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kysely_migration_lock
    ADD CONSTRAINT kysely_migration_lock_pkey PRIMARY KEY (id);


--
-- Name: kysely_migration kysely_migration_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kysely_migration
    ADD CONSTRAINT kysely_migration_pkey PRIMARY KEY (name);


--
-- Name: tag tag_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT tag_pkey PRIMARY KEY (id);


--
-- Name: tag tag_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT tag_unique UNIQUE (name);


--
-- Name: todo todo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.todo
    ADD CONSTRAINT todo_pkey PRIMARY KEY (id);


--
-- Name: todo_tag todo_tag_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.todo_tag
    ADD CONSTRAINT todo_tag_pkey PRIMARY KEY (todo_id, tag_id);


--
-- Name: todo_tag todo_tag_tag_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.todo_tag
    ADD CONSTRAINT todo_tag_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tag(id);


--
-- Name: todo_tag todo_tag_todo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.todo_tag
    ADD CONSTRAINT todo_tag_todo_id_fkey FOREIGN KEY (todo_id) REFERENCES public.todo(id);


--
-- PostgreSQL database dump complete
--

\unrestrict Fd0l1LurDWe1ipuTIxfWJRkbWQfspTKvHnJKb569zhjDIGhIXUb5YO4A6VtRgiv

