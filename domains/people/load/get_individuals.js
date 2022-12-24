import http from 'k6/http';

export default function () {
  const url = 'http://localhost:5000/individuals';

  const params = {
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkhqNFdyLXpJa05XTFdTUnVQZ2ZlZCJ9.eyJpc3MiOiJodHRwczovL3dhcmVob3VzZS5hdS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjM1MzQ4YWI5ZmRmM2IxNWI1ZGY1NDE3IiwiYXVkIjpbImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC8iLCJodHRwczovL3dhcmVob3VzZS5hdS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjY3Njg4Mzk2LCJleHAiOjE2Njc3NzQ3OTYsImF6cCI6ImlyRUkxZFZKT2J2aUo2N21ac1lGRWpQOTNFSWx0aHlzIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCB3cml0ZTpjYXRlZ29yeSByZWFkOmNhdGVnb3J5IHdyaXRlOml0ZW0gcmVhZDppdGVtIG9mZmxpbmVfYWNjZXNzIn0.kjogNt4dMxM624tnl8lBUXQEVxa6DirRiaBpVForUt7NcDttCPaiiZPEm_uo0QEvNy3ERrzMHZYwYmrXluiDSoelqynDbe88w5PpLZeFHPn-CA0gRzv0Y2zcqI-De19fFyjcrFwV8rSgH_MOq4rXMgOKTkDmIe8NUl1gSL98771nQ8b6--YHLKSBoeNuqTFBrUamQ3mfggUouK-kd75tnW754sORnwpS9_ujthim_Fnjfd9v-RtQBP3SemkpkuJdNKpUas_k7cs7HkMGQIiT42wpa8DVtggUh0NotRdmnLca1Qb4yT4PGwnJUi_XnUd-l8CXTer8HT5UWk8HEr-lHg',
      'Content-Type': 'application/json',
    },
  };

  http.get(url, params);
}
