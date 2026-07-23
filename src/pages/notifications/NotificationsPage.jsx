import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "../../services/notifications";
import { Button } from "../../components/ui/Button";
import { EmptyState } from "../../components/shared/EmptyState";
import { timeAgo, classNames } from "../../utils/helpers";
import toast from "react-hot-toast";

export const NotificationsPage = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => notificationService.getAll(),
  });

  const markAllRead = useMutation({
    mutationFn: () => notificationService.markAllRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("All marked as read");
    },
  });

  const markRead = useMutation({
    mutationFn: (id) => notificationService.markRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const priorityColors = {
    low: "border-l-gray-300",
    medium: "border-l-amber-400",
    high: "border-l-orange-500",
    urgent: "border-l-red-500",
  };

  if (isLoading) {
    return (
      <div className='max-w-2xl mx-auto space-y-3'>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className='h-20 bg-gray-100 rounded animate-pulse' />
        ))}
      </div>
    );
  }

  const notifications = data?.results || [];

  return (
    <div className='max-w-2xl mx-auto'>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-bold text-gray-900'>Notifications</h1>
        {data?.unread_count > 0 && (
          <Button
            variant='outline'
            size='sm'
            onClick={() => markAllRead.mutate()}
          >
            Mark all read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState
          title='No notifications'
          description="You're all caught up"
        />
      ) : (
        <div className='space-y-2'>
          {notifications.map((notification) => (
            <button
              key={notification.id}
              onClick={() =>
                !notification.is_read && markRead.mutate(notification.id)
              }
              className={classNames(
                "w-full text-left bg-white rounded-lg border border-gray-200 p-4 border-l-4 transition-colors hover:bg-gray-50",
                priorityColors[notification.priority] || "border-l-gray-300",
                !notification.is_read && "bg-blue-50/50",
              )}
            >
              <div className='flex items-start justify-between'>
                <div>
                  <p
                    className={classNames(
                      "text-sm",
                      !notification.is_read
                        ? "font-semibold text-gray-900"
                        : "text-gray-700",
                    )}
                  >
                    {notification.title}
                  </p>
                  <p className='text-sm text-gray-500 mt-1'>
                    {notification.message}
                  </p>
                </div>
                <span className='text-xs text-gray-400 whitespace-nowrap ml-4'>
                  {timeAgo(notification.created_at)}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
