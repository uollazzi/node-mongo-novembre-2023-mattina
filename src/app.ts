import { MongoClient, ObjectId } from "mongodb";
import { config } from "dotenv";
import { readFileSync } from "node:fs";

config();

const connectionString = process.env.MONGO_DB_CONNECTION_STRING;

const esegui = async () => {
    if (!connectionString) {
        console.error("Connection String non trovata.");
        return;
    }

    // instanziamo il client (collegamento alla engine/server di mongodb)
    const client = new MongoClient(connectionString);

    try {
        // connessione esplicita
        // client.connect();

        // specifichaimo il db da utilizzare
        const db = client.db("amazon");

        // riferimento alla collection
        const prodotti = db.collection("prodotti");

        // const dati = prodotti.find({ name: "Bicicletta" }).project({ name: 1, _id: 0 });
        const dati = prodotti.find();

        let datiProdotti = await dati.toArray();

        console.log(datiProdotti);

        // console.log(await client.db("amazon").collection("prodotti").find().toArray());

    } catch (error) {
        console.log(error);
    }
    finally {
        client.close();
    }
}

const addProdotto = async (nome: string, prezzo: number) => {
    if (!connectionString) {
        console.error("Connection String non trovata.");
        return;
    }

    // instanziamo il client (collegamento alla engine/server di mongodb)
    const client = new MongoClient(connectionString);

    try {
        // specifichaimo il db da utilizzare
        const db = client.db("amazon");

        // riferimento alla collection
        const prodotti = db.collection("prodotti");

        const result = await prodotti.insertOne({
            nome,
            prezzo
        });

        console.log(result);

    } catch (error) {
        console.log(error);
    }
    finally {
        client.close();
    }
}

const getProdottoById = async (id: string) => {
    if (!connectionString) {
        console.error("Connection String non trovata.");
        return;
    }

    // instanziamo il client (collegamento alla engine/server di mongodb)
    const client = new MongoClient(connectionString);

    try {
        // specifichaimo il db da utilizzare
        const db = client.db("amazon");

        // riferimento alla collection
        const prodotti = db.collection("prodotti");

        const result = await prodotti.findOne({ _id: new ObjectId(id) });
        console.log(result);

    } catch (error) {
        console.log(error);
    }
    finally {
        client.close();
    }
}

const aggiornaPrezzo = async (id: string, prezzo: number) => {
    if (!connectionString) {
        console.error("Connection String non trovata.");
        return;
    }

    // instanziamo il client (collegamento alla engine/server di mongodb)
    const client = new MongoClient(connectionString);

    try {
        // specifichaimo il db da utilizzare
        const db = client.db("amazon");

        // riferimento alla collection
        const prodotti = db.collection("prodotti");

        const result = await prodotti.updateOne({ _id: new ObjectId(id) }, { $set: { "prezzo": prezzo } });
        console.log(result);

    } catch (error) {
        console.log(error);
    }
    finally {
        client.close();
    }
}

const deleteProdotto = async (id: string) => {
    if (!connectionString) {
        console.error("Connection String non trovata.");
        return;
    }

    // instanziamo il client (collegamento alla engine/server di mongodb)
    const client = new MongoClient(connectionString);

    try {
        // specifichaimo il db da utilizzare
        const db = client.db("amazon");

        // riferimento alla collection
        const prodotti = db.collection("prodotti");

        const result = await prodotti.deleteOne({ _id: new ObjectId(id) });
        console.log(result);

    } catch (error) {
        console.log(error);
    }
    finally {
        client.close();
    }
}

const importa = async (path: string) => {
    if (!connectionString) {
        console.error("Connection String non trovata.");
        return;
    }

    // instanziamo il client (collegamento alla engine/server di mongodb)
    const client = new MongoClient(connectionString);

    try {
        const dataString = readFileSync(path, { encoding: "utf8" });

        const dataJson = JSON.parse(dataString);

        // specifichaimo il db da utilizzare
        const db = client.db("amazon");

        // riferimento alla collection
        const utenti = db.collection("utenti");

        const result = await utenti.insertMany(dataJson);
        console.log(result);
        console.log("id del primo:", result.insertedIds["0"].getTimestamp());



    } catch (error) {
        console.log(error);
    }
    finally {
        client.close();
    }
}

// addProdotto("Chitarra Acustica", 2000).then(() => esegui());
// aggiornaPrezzo("65549938cd8a0b2b09593655", 999).then(() => getProdottoById("65549938cd8a0b2b09593655"));
// deleteProdotto("65549938cd8a0b2b09593655").then(() => esegui());
importa("./users.json");