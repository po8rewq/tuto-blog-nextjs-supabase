create policy "everyone can see posts"
on "public"."posts"
as permissive
for select
to public
using (true);


create policy "only logged in users can create posts"
on "public"."posts"
as permissive
for insert
to authenticated
with check (true);


create policy "only the user can edit"
on "public"."posts"
as permissive
for update
to public
using ((auth.uid() = author))
with check ((auth.uid() = author));


create policy "only the user can delete his own posts"
on "public"."posts"
as permissive
for delete
to public
using ((auth.uid() = author));
