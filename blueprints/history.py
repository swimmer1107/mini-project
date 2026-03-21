from flask import Blueprint, render_template, flash, redirect, url_for
from flask_login import login_required, current_user
from models.db_models import db, Prediction

history_bp = Blueprint('history', __name__)

@history_bp.route('/history')
@login_required
def history():
    records = Prediction.query.filter_by(user_id=current_user.id).order_by(Prediction.timestamp.desc()).all()
    return render_template('history.html', records=records)

@history_bp.route('/history/clear', methods=['POST'])
@login_required
def clear_history():
    Prediction.query.filter_by(user_id=current_user.id).delete()
    db.session.commit()
    flash('History cleared entirely.', 'success')
    return redirect(url_for('history.history'))
