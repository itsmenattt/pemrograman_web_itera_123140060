from pyramid.view import view_config
from pyramid.response import Response
from sqlalchemy.exc import DBAPIError
from ..models import Matakuliah

# 1. AMBIL SEMUA DATA (GET)
@view_config(route_name='get_matakuliah', renderer='json')
def get_matakuliah(request):
    try:
        mks = request.dbsession.query(Matakuliah).all()
        return {'matakuliahs': [mk.to_dict() for mk in mks]}
    except DBAPIError:
        return Response(json_body={'error': 'Database error'}, status=500)

# 2. TAMBAH DATA (POST)
@view_config(route_name='add_matakuliah', renderer='json')
def add_matakuliah(request):
    try:
        data = request.json_body
        # Validasi input
        if not all(key in data for key in ('kode_mk', 'nama_mk', 'sks', 'semester')):
             return Response(json_body={'error': 'Data tidak lengkap'}, status=400)

        new_mk = Matakuliah(
            kode_mk=data['kode_mk'],
            nama_mk=data['nama_mk'],
            sks=data['sks'],
            semester=data['semester']
        )
        request.dbsession.add(new_mk)
        return {'message': 'Berhasil menambahkan data', 'data': new_mk.to_dict()}
    except Exception as e:
        request.response.status = 400
        return {'error': str(e)}

# 3. AMBIL 1 DATA (GET BY ID)
@view_config(route_name='get_detail_matakuliah', renderer='json')
def get_detail_matakuliah(request):
    mk_id = request.matchdict['id']
    mk = request.dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    if not mk:
        return Response(json_body={'error': 'Data tidak ditemukan'}, status=404)
    return mk.to_dict()

# 4. UPDATE DATA (PUT)
@view_config(route_name='update_matakuliah', renderer='json')
def update_matakuliah(request):
    mk_id = request.matchdict['id']
    mk = request.dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    if not mk:
        return Response(json_body={'error': 'Data tidak ditemukan'}, status=404)
    
    data = request.json_body
    mk.kode_mk = data.get('kode_mk', mk.kode_mk)
    mk.nama_mk = data.get('nama_mk', mk.nama_mk)
    mk.sks = data.get('sks', mk.sks)
    mk.semester = data.get('semester', mk.semester)
    
    return {'message': 'Data berhasil diupdate', 'data': mk.to_dict()}

# 5. HAPUS DATA (DELETE)
@view_config(route_name='delete_matakuliah', renderer='json')
def delete_matakuliah(request):
    mk_id = request.matchdict['id']
    mk = request.dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    if not mk:
        return Response(json_body={'error': 'Data tidak ditemukan'}, status=404)
    
    request.dbsession.delete(mk)
    return {'message': 'Data berhasil dihapus'}