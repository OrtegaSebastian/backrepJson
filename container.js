const fs = require ('fs');

class Container {
    constructor(file) {
        this.file = file;
    }
    // save(Object): Number - Recibe un objeto, lo guarda en el file, devuelve el id asignado.
    async save(objProduct) {
        const data = await fs.promises.readFile(`${this.file}`,"utf-8")
        if(data){
        const products = JSON.parse(data);
        const id = products.length +1;
            objProduct.id = id;     
            products.push(objProduct);
                const productsString = JSON.stringify(products);
                await fs.promises.writeFile(`${this.file}`, productsString);
                return products;
            }
            else{
                objProduct.id = 1;
                this.product.push(objProduct);
                const productsString = JSON.stringify(this.product);
                await fs.promises.writeFile(`${this.file}`, productsString);
            }      
    }

    // getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
    async getProdById(id) {
        try {
            const fs = require ('fs');
            const data = await fs.promises.readFile(`${this.file}`, 'utf-8');
            const products = JSON.parse(data);
            const product = products.find((product) => product.id == id);
            if (product) {
                return product;
            } else {
                return "products not found";
            }
        } catch (error) {
            return error;
        }
    }

    // getAll(): Object[] - Devuelve un array con los objetos presentes en el file.
    async getAll() {
        try {
            const fs = require ('fs');
            let products;
            if (await fs.stat(`${this.file}`, async () => {
                const fileData = await fs.readFileSync(`${this.file}`, 'utf-8');
                console.log(fileData);
            products = fileData.toString().split("\n");
            }))
            {
            return JSON.parse(products);
            } else {
            return `${this.file} not found`;
            }
        } catch (error) {
            return error;
        }
    }

    // deleteAll(): void - Elimina todos los objetos presentes en el file.
    async deleteAll(){  
        try {
            if (fs.existsSync(`${this.file}`)) {
                fs.unlinkSync(`${this.file}`, 'utf-8' );
                console.log("the file has been erased");
            }else{
                console.log("the file does not exist");
            }
        } catch (error) {
            return [];
        }
    }

    // deleteById(Number): void - Elimina del file el objeto con el id buscado
    async deleteById(id){
        //spliceby id
        try {
            const fs = require ('fs');
            const data = await fs.promises.readFile(`${this.file}`, "utf-8");
            const products = JSON.parse(data);
            const resultProducts = products.filter((product) => product.id != id);
            await fs.promises.writeFile(`${this.file}`,resultProducts);
        } catch (error) {
            return [];
        }
    }

}

const db = new Container("data.txt");
//db.save({title: "prod1"});
db.save({title: "prod2", id: "35135135"});
//db.deleteAll();
const all = async () => {await db.getAll()};
console.log(`all: ${JSON.stringify(all)}`);