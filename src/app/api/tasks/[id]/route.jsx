const BACKEND_URL = "http://localhost:8080/api/tasks";

/* -------- GET TASK BY ID -------- */
export async function GET(request, { params }) {
  const { id } = params;

  const res = await fetch(`${BACKEND_URL}/${id}`);

  if (!res.ok) {
    return new Response("Task not found", { status: 404 });
  }

  const data = await res.json();
  return Response.json(data);
}

/* -------- UPDATE TASK -------- */
export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();

  const res = await fetch(`${BACKEND_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return new Response("Update failed", { status: res.status });
  }

  const data = await res.json();
  return Response.json(data);
}

/* -------- DELETE TASK -------- */
export async function DELETE(request, { params }) {
  const { id } = params;

  const res = await fetch(`${BACKEND_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    return new Response("Delete failed", { status: res.status });
  }

  return new Response(null, { status: 204 });
}
