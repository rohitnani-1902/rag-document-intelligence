const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const html=fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const context={};vm.createContext(context);vm.runInContext(script.slice(0,script.indexOf('let chunks=seed'))+';globalThis.api={seed,rank,tokenize,splitText,validateFile};',context);
const {seed,rank,tokenize,splitText,validateFile}=context.api;
const fixtures=[
 ['response latency','Engineering handbook.md'],['source citations','Customer research notes.txt'],
 ['retrieval pipeline','Retrieval design brief.md'],['tenant encrypted retention','Security baseline.md'],
 ['launch rollback billing','Product launch playbook.md'],['p95 endpoint','Engineering handbook.md'],
 ['verify recommendation','Customer research notes.txt'],['semantically chunks','Retrieval design brief.md'],
 ['access logs audits','Security baseline.md'],['messaging support','Product launch playbook.md']
];
let correct=0;for(const [query,source] of fixtures){assert.equal(rank(query,seed)[0].source,source,query);correct++;}
for(const query of ['zzzzunmatchedtoken','the and of',''])assert.equal(rank(query,seed).length,0);
assert.equal(rank('rare common',[{text:'common common common'},{text:'rare common'}])[0].index,1);
assert.equal(rank('café',[{text:'CAFÉ menu'}]).length,1);
assert.equal(rank('same',[{text:'same'},{text:'same'}])[0].index,0);
assert.equal(validateFile({name:'bad.pdf',size:1}),'unsupported file type');
assert.equal(validateFile({name:'ok.TXT',size:1500000}),'');
assert.equal(validateFile({name:'big.txt',size:1500001}),'exceeds 1.5 MB');
assert.equal(splitText(' ').parts.length,0);
assert.equal(splitText('x'.repeat(1000)+' tail').parts.join(' ').includes('tail'),true);
assert.equal(splitText('word '.repeat(20000),2).truncated,true);
assert.equal(splitText('word '.repeat(20000),2).parts.length,2);
assert.ok(!script.includes('innerHTML'),'imported text must use textContent');
assert.ok(script.includes("n.textContent=text"));
console.log('Labeled sample queries: '+correct+'/'+fixtures.length+' top-1; no-match, ranking, Unicode, size, chunking and safe-render checks passed.');
