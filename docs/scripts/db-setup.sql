-- Create a role to manage the database
CREATE ROLE secret_products_app_admin LOGIN;

-- Create a role to read and modify tables
CREATE ROLE secret_products_app_user LOGIN;

-- Create the database
CREATE DATABASE secret_products OWNER secret_products_app_admin;
