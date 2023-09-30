CREATE TABLE WORKSPACE (ID INTEGER PRIMARY KEY ASC,
                        DIRECTORY VARCAHR(1000),
                        CREATED TIMESTAMP,
                        ACTIVE BOOLEAN,
                        INDEXED TIMESTAMP);
