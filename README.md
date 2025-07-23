# SmartTree

SmartTree is a mobile application designed for in-field data collection to support wood traceability operations. It provides forestry operators with an easy-to-use tool for smartphones to register and manage tree and timber data throughout the timber marking and cutting phases.

## Key Features

- **Timber Traceability:** Register and track individual trees and timber products using RFID codes and other identifiers.
- **In-Field Data Collection:** Capture essential information directly from the field, including tree species, diameter class, height, quality, and notes.
- **Geolocation:** Use the smartphone's GPS to record the precise geographical position of each tree.
- **RFID and Bluetooth Integration:** Associate RFID tags with trees and timber, leveraging smartphone connectivity options.
- **Synchronized Data Management:** Store collected data in an internal database and synchronize it later with a remote server when connectivity is available.
- **User-Friendly Interface:** Intuitive menus and forms for listing, adding, and editing tree and timber records.
- **Administrative Tools:** Manage users, supply chains, and forestry management plans from within the app.

## Main Components

- **Tree (Pianta) Management:** Add, edit, and list trees with detailed attributes such as species, class, height, tariff, quality, location (GPS), timestamp, and notes.
- **Timber (Toppo) Management:** Manage logs and timber pieces, associating them with their source tree, dimensions, and RFID codes.
- **Forestry Management:** Organize data by nodes, supply chains, and management plans.
- **Configuration:** Lookup tables and customizable configuration options for field data.

## Technology

- **Frontend:** JavaScript (Ext JS framework)
- **Backend:** PHP scripts for data storage and synchronization
- **Database:** Internal storage on the device, with support for remote server synchronization

## Typical Workflow

1. **Login:** Secure access for users.
2. **Tree Marking:** Mark trees in the field, assigning RFID tags and capturing species, dimensions, and GPS location.
3. **Cutting Phase:** Track logs generated from marked trees, linking each log back to its source tree.
4. **Data Review:** List and edit registered trees and logs within the app.
5. **Synchronization:** Upload collected data to the central server for traceability and further processing.

## Project Status

SmartTree is actively developed to streamline and digitize wood traceability from the field, supporting sustainable forestry operations and regulatory compliance.
