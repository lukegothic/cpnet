export const ListadoDeConcentracionesParcelarias = async () => {
  const cp = await getConcentracionParcelaria();
  const parcelas = await getParcelas(cp);
  return { cp, parcelas };
}
