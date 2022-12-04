from app.models import db, User
import os


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', name="Demo", email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', name="Marnie", email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', name="Bobbie", email='bobbie@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if os.environ.get("FLASK_ENV") == 'development':
        db.session.execute('DELETE FROM users;')
    else:
        db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
