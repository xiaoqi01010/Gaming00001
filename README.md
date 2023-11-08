# Gaming00001
function alive(pooh){
  let Caffeine = true;
  let Gaming = false;
  return !is_null(pooh)
    ? Caffeine && alive(tail(pooh))
    : Gaming
    ;
}
const pooh = list("idk","teehee","OMG MIDTERM","UM PA","OK wtv","peepeepoopoo");
alive(pooh);
