import CategoryPageBase from "@/components/CategoryPageBase";

export default async function MovePage({ params }: { params: { locale: string } }) {
    return <CategoryPageBase category="move" locale={params.locale} />;
}
