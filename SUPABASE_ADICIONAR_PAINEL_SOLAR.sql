-- BRASIL SURVIVALZ - ADICIONAR PAINEL SOLAR AO CATALOGO
-- Seguro para rodar na loja já existente: preserva todo o bs_catalog() atual.

do $$
declare
  v_catalog jsonb;
begin
  v_catalog :=
    public.bs_catalog()
    ||
    jsonb_build_object(
      'solarpanel',
      jsonb_build_object(
        'name', 'Painel Solar',
        'brl', 35,
        'bs', 10000
      )
    );

  execute format(
    'create or replace function public.bs_catalog()
     returns jsonb
     language sql
     immutable
     set search_path to ''public''
     as $fn$
       select %L::jsonb
     $fn$;',
    v_catalog::text
  );
end
$$;

notify pgrst, 'reload schema';

-- TESTE: deve retornar nome, brl 35 e bs 10000.
select public.bs_catalog()->'solarpanel' as solarpanel;
