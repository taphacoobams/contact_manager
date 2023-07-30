from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask_mysqldb import MySQL

app = Flask(__name__)
api = Api(app)

# Configuration de la base de données MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'contact'
mysql = MySQL(app)

# Classe pour la ressource 'contacts'
class ContactsResource(Resource):
    def get(self, contact_id=None):
        if contact_id is None:
            # Récupérer tous les contacts
            cur = mysql.connection.cursor()
            cur.execute("SELECT * FROM contact")
            contacts = cur.fetchall()
            cur.close()
            return {'contacts': contacts}, 200
        else:
            # Récupérer un contact spécifique par son ID
            cur = mysql.connection.cursor()
            cur.execute("SELECT * FROM contact WHERE id = %s", (contact_id,))
            contact = cur.fetchone()
            cur.close()
            if contact:
                return {'contact': contact}, 200
            else:
                return {'message': 'Contact non trouvé'}, 404

    def post(self):
        # Ajouter un nouveau contact
        parser = reqparse.RequestParser()
        parser.add_argument('nom', type=str, required=True)
        parser.add_argument('prenom', type=str, required=True)
        parser.add_argument('adresse', type=str, required=True)
        parser.add_argument('email', type=str, required=True)
        parser.add_argument('telephone', type=str, required=True)
        parser.add_argument('description', type=str, required=True)
        args = parser.parse_args()

        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO contact (nom, prenom, adresse, email, telephone, description) VALUES (%s, %s, %s, %s, %s, %s)",
                    (args['nom'], args['prenom'], args['adresse'], args['email'], args['telephone'], args['description']))
        mysql.connection.commit()
        cur.close()

        return {'message': 'Contact ajouté avec succès'}, 201

    def put(self, contact_id):
        # Modifier un contact existant par son ID
        parser = reqparse.RequestParser()
        parser.add_argument('nom', type=str, required=True)
        parser.add_argument('prenom', type=str, required=True)
        parser.add_argument('adresse', type=str, required=True)
        parser.add_argument('email', type=str, required=True)
        parser.add_argument('telephone', type=str, required=True)
        parser.add_argument('description', type=str, required=True)
        args = parser.parse_args()

        cur = mysql.connection.cursor()
        cur.execute("UPDATE contact SET nom = %s, prenom = %s, adresse = %s, email = %s, telephone = %s, description = %s WHERE id = %s",
                    (args['nom'], args['prenom'], args['adresse'], args['email'], args['telephone'], args['description'], contact_id))
        mysql.connection.commit()
        cur.close()

        return {'message': 'Contact modifié avec succès'}, 200

    def delete(self, contact_id):
        # Supprimer un contact existant par son ID
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM contact WHERE id = %s", (contact_id,))
        mysql.connection.commit()
        cur.close()

        return {'message': 'Contact supprimé avec succès'}, 200

# Ajouter la ressource 'ContactsResource' à l'API avec l'URL '/contacts' et '/contacts/<int:contact_id>'
api.add_resource(ContactsResource, '/contacts', '/contacts/<int:contact_id>')

if __name__ == '__main__':
    app.run(debug=True)
