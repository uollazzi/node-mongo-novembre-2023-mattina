import mongoose from "mongoose";
import { config } from "dotenv";
import { Categoria } from "./models/categoria";
config();

const connectionString = process.env.MONGO_DB_CONNECTION_STRING;

const addCategoria = async (titolo: string, sottotitolo: string, descrizione: string) => {
    try {
        await mongoose.connect(connectionString!, { dbName: "amazon" });

        let cat = new Categoria();

        cat.titolo = titolo.toUpperCase();
        cat.sottotitolo = sottotitolo;
        cat.descrizione = descrizione;

        let result = await cat.save();

        console.log(result);
        return result;

    } catch (error) {
        console.error(error);
    } finally {
        await mongoose.disconnect();
    }
}

const getCategorie = async () => {
    try {
        await mongoose.connect(connectionString!, { dbName: "amazon" });

        let categorie = await Categoria.find();
        console.log(categorie);
    } catch (error) {
        console.error(error);
    } finally {
        await mongoose.disconnect();
    }
}

const updateCategoria = async (
    id: string,
    titolo: string,
    sottotitolo: string,
    descrizione: string,
    attiva: boolean
) => {
    try {
        await mongoose.connect(connectionString!, { dbName: "amazon" });

        let cat = await Categoria.findById(id);

        if (cat) {
            cat.titolo = titolo;
            cat.sottotitolo = sottotitolo;
            cat.descrizione = descrizione;
            cat.attiva = attiva;

            let result = await cat.save();

            console.log(result);
        }



    } catch (error) {
        console.error(error);
    } finally {
        await mongoose.disconnect();
    }
}

const deleteCategoria = async (id: string) => {
    try {
        await mongoose.connect(connectionString!, { dbName: "amazon" });

        let result = await Categoria.deleteOne({ _id: id });
        console.log(result);

        // let cat = await Categoria.findById(id);
        // if (cat) {
        //     let result = await cat.deleteOne();
        //     console.log(result);
        // }

    } catch (error) {
        console.error(error);
    } finally {
        await mongoose.disconnect();
    }
}

const getCategoriaById = async (id: string) => {
    try {
        await mongoose.connect(connectionString!, { dbName: "amazon" });

        let cat = await Categoria.findById(id);
        console.log(cat)

    } catch (error) {
        console.error(error);
    } finally {
        await mongoose.disconnect();
    }
}

// addCategoria("Cucina", "L'arte della Cucina", "Descrizione bella ed ampia");
// getCategorie();
// updateCategoria("6554b33f058cd5b49b665a8f", "CUCINA", "Sottotitolo", "Descrizione bella ed ampia", false);
deleteCategoria("6554b33f058cd5b49b665a8f");

