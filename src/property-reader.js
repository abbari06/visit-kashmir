const PropertiesReader = require('properties-reader');
const prop = PropertiesReader("app.properties");

class PropertyReader{
    getProperty = (pty) => {
        return prop.get(pty);
    }
}

module.exports = new PropertyReader();