import json,sys,pathlib
p=pathlib.Path(sys.argv[1]); dados=json.loads(p.read_text(encoding='utf-8')); erros=[]
for i,q in enumerate(dados):
    for campo in ('id','vestibular','ano','numero','opcoes'):
        if campo not in q: erros.append((i,campo))
ids=[q.get('id') for q in dados]; duplicados=sorted({x for x in ids if x and ids.count(x)>1})
print('Registros:',len(dados)); print('Erros:',erros[:20], 'total=',len(erros)); print('IDs duplicados:',duplicados[:20])
