-- Hack2Hire Database Code

BEGIN;

CREATE TABLE weather
(
    id bigserial NOT NULL,
    city character varying(256),    
    description character varying(512),
    pressure NUMERIC,
    humidity NUMERIC,
    time BIGINT,
    rawjson character varying(4096),
    
    PRIMARY KEY (id)
);

END;
